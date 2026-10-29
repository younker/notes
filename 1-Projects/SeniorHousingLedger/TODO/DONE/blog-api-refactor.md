# Blog API Refactor

## Goal

Move the blog system from static build-time markdown rendering to a fully dynamic API-driven architecture.

## Current State

- Blog posts live as markdown files in `ship-ui/src/posts/*.md`
- mdsvex processes them at build time into static HTML pages
- A `sync-blog-posts` GitHub Actions workflow syncs the markdown source to an S3 bucket (`ship-prod-blog-content`) so the Go API can serve them in the admin editor
- Publishing a new post requires a site rebuild and deploy
- Images are split between `static/images/blog/` (checked into the repo) and API-uploaded images (stored by the Go backend)
- The admin editor already creates/edits posts via the Go API, but the public-facing blog reads from the filesystem at build time

## Target State

- Blog posts are created and edited in the frontend admin UI
- The frontend sends content and images to the Go API via HTTP
- The Go API stores blog content and images to S3
- The public `/blog` page calls `GET /api/blogs` to retrieve a list of all published posts
- Individual blog pages call `GET /api/blogs/:slug` to retrieve post content
- No build-time markdown processing -- blog content is fetched and rendered at runtime
- No `sync-blog-posts` workflow
- No `src/posts/` directory in ship-ui
- No site rebuild required to publish a new post
- New database table tracks blog content so s3 API lookup calls are not needed for things like the /blogs page
- Blog table tracks slug, s3 stored blog content and image, date created, version, last date modified
- Blog content and image are stored in versioned s3 bucket
- Previous versions are accessible to admins via dropdown in in blog post page

## Key Changes

### Frontend (ship-ui)

- Remove `src/posts/` directory and all markdown files
- Remove mdsvex dependency and build-time markdown processing
- Remove `sync-blog-posts.yml` GitHub Actions workflow
- Update `/blog` route to fetch post list from API on page load
- Update `/blog/[slug]` route to fetch individual post from API on page load
- Add client-side markdown rendering for blog display (the admin preview already has this via `markdown-renderer.ts`)
- Blog pages become dynamic (client-side rendered) rather than prerendered

### Backend (ship/api)

- `GET /api/blogs` -- returns array of published blog post summaries (title, slug, description, date, image, tags)
- `GET /api/blogs/:slug` -- returns full blog post content for a given slug
- Blog content and images stored in S3
- The admin CRUD endpoints already exist; public read endpoints may need to be added or separated from admin auth

### Infrastructure

- Remove the `sync-blog-posts` workflow and associated IAM permissions
- The `blog_s3_bucket_arn` Terraform variable added in quick task 2 may still be relevant if the API uses the same bucket
- CloudFront invalidation on deploy no longer needs to cover blog content (it's API-served)

## Considerations

- SEO: Static prerendered pages are better for crawlers. Moving to client-side rendering means blog content won't be in the initial HTML. Consider whether this matters for the current stage, or whether SSR/prerendering of blog routes from API data is needed later.
- RSS feed: Currently generated at build time from the markdown files. Will need to be served by the API or generated differently.
- Existing posts: The two published markdown posts need to be migrated into the API/S3 datastore.
- Sitemap: Currently generated at build time. Blog entries would need to come from the API.
