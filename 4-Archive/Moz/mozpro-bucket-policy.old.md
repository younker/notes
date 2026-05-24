{
    "Version": "2012-10-17",
    "Id": "Policy1527108140775",
    "Statement": [
        {
            "Sid": "Stmt1527108135340",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::609408679048:root"
            },
            "Action": [
                "s3:List*",
                "s3:Get*"
            ],
            "Resource": "arn:aws:s3:::mozpro/*/tracked-urls.txt"
        }
    ]
}

## Related

- [[Moz MOC]]
