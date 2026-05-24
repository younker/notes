## Git Object Store

Do a lightning talk about how git stores all the things including commits, files, dir snapshots & tags. Here are a couple of articles that goes through the basics:

- https://medium.freecodecamp.org/understanding-git-for-real-by-exploring-the-git-directory-1e079c15b807
- https://git-scm.com/book/en/v2/Git-Internals-Git-Objects


Below is me playing around with concepts from the above articles:

```
--- projects/git-test ‹master* A› » g commit -m "first commit"
[master (root-commit) 62b7968] first commit
 1 file changed, 1 insertion(+)
 create mode 100644 some-text.txt
--- projects/git-test ‹master› » tree .git
.git
├── COMMIT_EDITMSG
├── HEAD
├── MERGE_RR
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── fsmonitor-watchman.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── pre-receive.sample
│   ├── prepare-commit-msg.sample
│   └── update.sample
├── index
├── info
│   └── exclude
├── logs
│   ├── HEAD
│   └── refs
│       └── heads
│           └── master
├── objects
│   ├── 62
│   │   └── b796867f86c7201dfce62fde564f4838e16b32
│   ├── 94
│   │   └── bc65d3df81ad84fb703ff8c52a487a658984be
│   ├── e8
│   │   └── e1f1fa29f29c028fa08820d648bb10a0a51ec9
│   ├── info
│   └── pack
├── refs
│   ├── heads
│   │   └── master
│   └── tags
└── rr-cache

15 directories, 24 files
--- projects/git-test ‹master› » cat .git/HEAD
ref: refs/heads/master
--- projects/git-test ‹master› » cat .git/refs/heads/master
62b796867f86c7201dfce62fde564f4838e16b32
--- projects/git-test ‹master› » g cat-file -p 62b796867f86c7201dfce62fde564f4838e16b32
tree 94bc65d3df81ad84fb703ff8c52a487a658984be
author Jason Younker <jason@ynkr.org> 1528218591 -0700
committer Jason Younker <jason@ynkr.org> 1528218591 -0700

first commit
--- projects/git-test ‹master› » g cat-file -p 94bc65d3df81ad84fb703ff8c52a487a658984be
100644 blob e8e1f1fa29f29c028fa08820d648bb10a0a51ec9  some-text.txt
--- projects/git-test ‹master› » g cat-file -p e8e1f1fa29f29c028fa08820d648bb10a0a51ec9
// Comment
--- projects/git-test ‹master› » mkdir docs
--- projects/git-test ‹master› » echo "## Documentation\n\ntodo: add some" > docs/README.md
--- projects/git-test ‹master* ?› » g add .
--- projects/git-test ‹master* A› » gdc
--- projects/git-test ‹master* A› » g commit -m "add docs readme"
[master 0b940d7] add docs readme
 1 file changed, 3 insertions(+)
 create mode 100644 docs/README.md
--- projects/git-test ‹master› » g cat-file -p 0b940d7
tree 2e1e834eef0699de955ebe1ffa7c4a50437d2f59
parent 62b796867f86c7201dfce62fde564f4838e16b32
author Jason Younker <jason@ynkr.org> 1528219606 -0700
committer Jason Younker <jason@ynkr.org> 1528219606 -0700

add docs readme
--- projects/git-test ‹master› » g cat-file -p 2e1e834eef0699de955ebe1ffa7c4a50437d2f59
040000 tree e413c9818537da352d80dd690d079ab5b32ecd44  docs
100644 blob e8e1f1fa29f29c028fa08820d648bb10a0a51ec9  some-text.txt
--- projects/git-test ‹master› » g cat-file -p e413c9818537da352d80dd690d079ab5b32ecd44
100644 blob c6959837c7a0a46b8c77b5140d0213b80ebd64e0  README.md
--- projects/git-test ‹master› » g cat-file -p c6959837c7a0a46b8c77b5140d0213b80ebd64e0
## Documentation

todo: add some
--- projects/git-test ‹master› » g cat-file -p 62b796867f86c7201dfce62fde564f4838e16b32
tree 94bc65d3df81ad84fb703ff8c52a487a658984be
author Jason Younker <jason@ynkr.org> 1528218591 -0700
committer Jason Younker <jason@ynkr.org> 1528218591 -0700

first commit
--- projects/git-test ‹master› » echo 'test content' | git hash-object -w --stdin
d670460b4b4aece5915caf5c68d12f560a9fe3e4
--- projects/git-test ‹master› » tree .git/objects
.git/objects
├── 0b
│   └── 940d796bebc87b42562a839481fe83428ae69f
├── 2e
│   └── 1e834eef0699de955ebe1ffa7c4a50437d2f59
├── 62
│   └── b796867f86c7201dfce62fde564f4838e16b32
├── 94
│   └── bc65d3df81ad84fb703ff8c52a487a658984be
├── c6
│   └── 959837c7a0a46b8c77b5140d0213b80ebd64e0
├── d6
│   └── 70460b4b4aece5915caf5c68d12f560a9fe3e4
├── e4
│   └── 13c9818537da352d80dd690d079ab5b32ecd44
├── e8
│   └── e1f1fa29f29c028fa08820d648bb10a0a51ec9
├── info
└── pack

10 directories, 8 files
--- projects/git-test ‹master› » g cat-file -p d670460b4b4aece5915caf5c68d12f560a9fe3e4
test content
--- projects/git-test ‹master› » echo 'this is manually added to the git objects store' > manually-added.txt
--- projects/git-test ‹master* ?› » g hash-object -w manually-added.txt
3affd32de6e02b6e5b7a7829fe528af384452609
--- projects/git-test ‹master* ?› » g cat-file -p 3affd32de6e02b6e5b7a7829fe528af384452609
this is manually added to the git objects store
--- projects/git-test ‹master* ?› » tree .git/objects
.git/objects
├── 0b
│   └── 940d796bebc87b42562a839481fe83428ae69f
├── 2e
│   └── 1e834eef0699de955ebe1ffa7c4a50437d2f59
├── 3a
│   └── ffd32de6e02b6e5b7a7829fe528af384452609
├── 62
│   └── b796867f86c7201dfce62fde564f4838e16b32
├── 94
│   └── bc65d3df81ad84fb703ff8c52a487a658984be
├── c6
│   └── 959837c7a0a46b8c77b5140d0213b80ebd64e0
├── d6
│   └── 70460b4b4aece5915caf5c68d12f560a9fe3e4
├── e4
│   └── 13c9818537da352d80dd690d079ab5b32ecd44
├── e8
│   └── e1f1fa29f29c028fa08820d648bb10a0a51ec9
├── info
└── pack

11 directories, 9 files
--- projects/git-test ‹master* ?› » g st
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

  manually-added.txt

nothing added to commit but untracked files present (use "git add" to track)
--- projects/git-test ‹master* ?› »
```

## Related

- [[Moz MOC]]
