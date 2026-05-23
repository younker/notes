---
subject: 'Undeliverable: Introduction and PHS summer schedule'
message_count: 1
first: 2026-05-18
last: 2026-05-18
senders:
- postmaster@outlook.com
type: email-thread
tags: []
---

# Undeliverable: Introduction and PHS summer schedule

**1 message** on 2026-05-18

## 1. 2026-05-18 17:31 — postmaster@outlook.com

mx.google.com rejected your message to the following email addresses:

jeffguiney@gmail.com<mailto:jeffguiney@gmail.com>
Your message wasn't delivered. Please try resending the message.


mx.google.com gave this error:
Your email has been blocked because the sender is unauthenticated. Gmail requires all senders to authenticate with either SPF or DKIM. Authentication results: DKIM = did not pass SPF [hotmail.com] with ip: [2a01:111:f403:c10d::3] = did not pass For instructions on setting up authentication, go to https://support.google.com/mail/answer/81126#authentication d9443c01a7336-2bd5d35e228si248988955ad.161 - gsmtp


Diagnostic information for administrators:

Generating server: IA0PR12MB7699.namprd12.prod.outlook.com

jeffguiney@gmail.com
mx.google.com
Remote server returned '550-5.7.26 Your email has been blocked because the sender is unauthenticated. 550-5.7.26 Gmail requires all senders to authenticate with either SPF or DKIM. 550-5.7.26 Authentication results: 550-5.7.26 DKIM = did not pass 550-5.7.26 SPF [hotmail.com] with ip: [2a01:111:f403:c10d::3] = did not pass 550-5.7.26 For instructions on setting up authentication, go to 550 5.7.26 https://support.google.com/mail/answer/81126#authentication d9443c01a7336-2bd5d35e228si248988955ad.161 - gsmtp'

Original message headers:

Received: from DM6PR12MB2971.namprd12.prod.outlook.com (2603:10b6:5:118::28)
 by IA0PR12MB7699.namprd12.prod.outlook.com (2603:10b6:208:431::7) with
 Microsoft SMTP Server (version=TLS1_2,
 cipher=TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384) id 15.21.25.23; Mon, 18 May
 2026 17:31:43 +0000
Resent-From: <jrguiney@hotmail.com>
Received: from DM6PR12MB2971.namprd12.prod.outlook.com ([::1]) by
 DM6PR12MB2971.namprd12.prod.outlook.com ([fe80::1d36:dae5:4d49:de87%4]) with
 Microsoft SMTP Server id 15.21.0025.022; Mon, 18 May 2026 17:31:43 +0000
ARC-Seal: i=2; a=rsa-sha256; s=arcselector10001; d=microsoft.com; cv=pass;
 b=aK0FQ3oyYSnhgC2uAB2mJh6FdQ1CXSukKJ2FHsVN/87MhzP366wmLVkYSsxUliSSK7gjkuTeGoRqlv9ZNoc/CJWuSfMfI1gVZHnm4ElNLQNobVjawKgUn2U9vg6L8LGBdKhAeMHy6bUg1Dq7KcZJG/tzlfHDM34YoLmIx9S9kOtXhAZWzEYx2TB8gjnXlObgkjP2e4i+Z1eb7s/ZUY5FtcqtpCBD+h1OACNJTh9IhVoP9a/znfVIjPQ0DFuvh8ZMAYyVMaL8U1/AFGzsh6D7s5bCcPgX4uUHkCH0hoxGSeoPuXLNOmZ3y8FO4uz/PWqeNFe6aJRaqelmtQdeCVJk0g==
ARC-Message-Signature: i=2; a=rsa-sha256; c=relaxed/relaxed; d=microsoft.com;
 s=arcselector10001;
 h=From:Date:Subject:Message-ID:Content-Type:MIME-Version:X-MS-Exchange-AntiSpam-MessageData-ChunkCount:X-MS-Exchange-AntiSpam-MessageData-0:X-MS-Exchange-AntiSpam-MessageData-1;
 bh=k+K78YECD5r3BYpJ1YDhmSokfBdk2/vMVcd97h9GPxw=;
 b=TfpP95Qss6eVFd4IYTmTJVNteWnqxJxK66AFTGaNe2iniBt81Y4XEjQgR10QgDCsw7fEhVufUUmvacV012H4WerjVe+49jrbgwK3Oz5XieKqGKdGOgipp0l32wN0g8HDMQ8NRjAaEOZq8wDLzEqWbCbF8Nm7qQA1mwMEfcCsYOXCV8CCeaJoMbPtoT9A4j+UZcMnfl2d0feE8dnnIU9dbf0SZI47zh8evUa2b9Db7AxNaAsbRZGnFlv+iO3Z4a8TQt0J15+MGmfrnSoCJpu5ydWmJmwDGBhhIYvH3GNCcx37agiev954F5buZK/2E2pWnkeWbF1GfOgTe+TMj3PRhg==
ARC-Authentication-Results: i=2; mx.microsoft.com 1; spf=pass (sender ip is
 136.143.188.11) smtp.rcpttodomain=hotmail.com smtp.mailfrom=ynkr.org;
 dmarc=bestguesspass action=none header.from=ynkr.org; dkim=fail (no key for
 signature) header.d=ynkr.org; arc=pass (0 oda=0 ltdi=0 93)
Authentication-Results: spf=pass (sender IP is 136.143.188.11)
 smtp.mailfrom=ynkr.org; dkim=fail (no key for signature)
 header.d=ynkr.org;dmarc=bestguesspass action=none
 header.from=ynkr.org;compauth=pass reason=109
Received-SPF: Pass (protection.outlook.com: domain of ynkr.org designates
 136.143.188.11 as permitted sender) receiver=protection.outlook.com;
 client-ip=136.143.188.11; helo=sender4-op-o11.zoho.com; pr=C
X-IncomingTopHeaderMarker: OriginalChecksum:6E8AD903C7E865AA326627AB8E349B64D061AE0C040E194BEA168C10BD2576A0;UpperCasedChecksum:D80F2E4B9EB9EAE01ACC8FF6D1DDE523261F33F9DA65BC0FEA8A093FF0A47F6F;SizeAsReceived:1933;Count:15
ARC-Seal: i=1; a=rsa-sha256; t=1779125499; cv=none;
        d=zohomail.com; s=zohoarc;
        b=Q7/OCDg2XQ/oR+XIcB0SduQKO1a6e0ib055XvZN6CMNAG2jBoWsxlqFQ6ySrhLh1bq0rKdqcuga1H7qFUDrybx8vk4KMNIQLTbTblovunCO3vliBdnRdTIjKq4NnAeKNR7Kuh6DTlcIj/W/mKwLeCBg6kpFlpDz0j55blaAduEI=
ARC-Message-Signature: i=1; a=rsa-sha256; c=relaxed/relaxed; d=zohomail.com; s=zohoarc;
        t=1779125499; h=Content-Type:Content-Transfer-Encoding:Date:Date:From:From:MIME-Version:Message-ID:Subject:Subject:To:To:Message-Id:Reply-To:Cc;
        bh=k+K78YECD5r3BYpJ1YDhmSokfBdk2/vMVcd97h9GPxw=;
        b=TsI4FcirG9WB07Tg87aQNGYSJ3yMDDiMtYqqiODwXmJ5t6qIM/4XGxP2ccunxqSZdlm7E32qI7zmYF776QSgLeDxrl1emlCQjhgk/Imo+ShWiteZxYYDPPzODh+ZkIhdCxWP2WuKalQ4dpJ6vy18o0CJd/rGYfpSGtREXh47ta4=
ARC-Authentication-Results: i=1; mx.zohomail.com;
        dkim=pass  header.i=ynkr.org;
        spf=pass  smtp.mailfrom=jason@ynkr.org;
        dmarc=pass header.from=<jason@ynkr.org>
DKIM-Signature: v=1; a=rsa-sha256; q=dns/txt; c=relaxed/relaxed; t=1779125499;
        s=zoho; d=ynkr.org; i=jason@ynkr.org;
        h=From:From:Content-Type:Content-Transfer-Encoding:Mime-Version:Subject:Subject:Message-Id:Message-Id:Date:Date:To:To:Reply-To:Cc;
        bh=k+K78YECD5r3BYpJ1YDhmSokfBdk2/vMVcd97h9GPxw=;
        b=k/fpBrhySmqKDNGlKvBgO04RitFQBFyhZwwdNvjWxvRqVOIm6iDrbfyfb/2VQ8Rb
        byE3xRzh8yfBd5Pe1HEs8cnS42U0zPfrb9hXb/+54aXpOCYpl/KEQS5Rn0bLDKpSO8W
        OWHF6GOABAq9dl7NpisvVafgMm99f7CrHLMWfoYM=
From: Jason Younker <jason@ynkr.org>
Content-Type: text/plain;
        charset=utf-8
Content-Transfer-Encoding: quoted-printable
MIME-Version: 1.0 (Mac OS X Mail 16.0 \(3776.700.51.11.8\))
Subject: Introduction and PHS summer schedule
Message-ID: <BF7DE6E1-A65C-4301-A61E-165526EDEBB3@ynkr.org>
Date: Mon, 18 May 2026 13:31:25 -0400
To: jrguiney@hotmail.com
X-Mailer: Apple Mail (2.3776.700.51.11.8)
X-ZohoMailClient: External
X-IncomingHeaderCount: 15
Return-Path: jason@ynkr.org
X-EOPAttributedMessage: 0
X-EOPTenantAttributedMessage: 84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa:0
X-MS-PublicTrafficType: Email
X-MS-TrafficTypeDiagnostic:
        CY4PEPF0000E9D9:EE_|PH8PR12MB6698:EE_|DM6PR12MB2971:EE_|IA0PR12MB7699:EE_
X-MS-UserLastLogonTime: 5/18/2026 4:58:33 PM
X-MS-Office365-Filtering-Correlation-Id: 87eb6760-23be-4dd6-b15b-08deb50352ca
X-MS-Exchange-EOPDirect: true
X-Sender-IP: 136.143.188.11
X-SID-PRA: JASON@YNKR.ORG
X-SID-Result: PASS
X-Microsoft-Antispam: BCL:0;ARA:1444111002|2700799033|22090799003|21090799003|9800799015|29090799004|51300799024|46080799009|87000799021|58200799025|69000799021|13020799009|5099299006|60050799009|970799063|84100799006|57050799003|440099028|3412199025|1360799030|1370799030|1380799030|26104999009|56899033;
X-MS-Exchange-CrossTenant-OriginalArrivalTime: 18 May 2026 17:31:41.0686
 (UTC)
X-MS-Exchange-CrossTenant-Network-Message-Id: 87eb6760-23be-4dd6-b15b-08deb50352ca
X-MS-Exchange-CrossTenant-Id: 84df9e7f-e9f6-40af-b435-aaaaaaaaaaaa
X-MS-Exchange-CrossTenant-AuthSource: CY4PEPF0000E9D9.namprd05.prod.outlook.com
X-MS-Exchange-CrossTenant-AuthAs: Anonymous
X-MS-Exchange-CrossTenant-FromEntityHeader: Internet
X-MS-Exchange-CrossTenant-RMS-PersistedConsumerOrg: 00000000-0000-0000-0000-000000000000
X-MS-Exchange-Transport-CrossTenantHeadersStamped: PH8PR12MB6698
X-MS-Exchange-Transport-EndToEndLatency: 00:00:01.7434729
X-MS-Exchange-Processed-By-BccFoldering: 15.21.0025.012
X-MS-Exchange-Inbox-Rules-Loop: jrguiney@hotmail.com
X-OriginatorOrg: sct-15-20-9412-4-msonline-outlook-10359.templateTenant

---
