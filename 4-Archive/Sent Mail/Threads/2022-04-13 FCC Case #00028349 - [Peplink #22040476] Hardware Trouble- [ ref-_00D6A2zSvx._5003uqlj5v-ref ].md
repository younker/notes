---
subject: "FCC Case #00028349 | [Peplink #22040476] Hardware Trouble?    [ ref:_00D6A2zSvx._5003uqlj5v:ref ]"
message_count: 3
first: 2022-04-13
last: 2022-04-14
senders:
  - jason@ynkr.org
type: email-thread
tags: [email]
---

# FCC Case #00028349 | [Peplink #22040476] Hardware Trouble?    [ ref:_00D6A2zSvx._5003uqlj5v:ref ]

**3 messages** from 2022-04-13 to 2022-04-14

## 1. 2022-04-13 18:58 — jason@ynkr.org

*Subject: Re: FCC Case #00028349 | [Peplink #22040476] Hardware Trouble?    [ ref:_00D6A2zSvx._5003uqlj5v:ref ]*

Topher,

Thanks for the tips. Some of my troubleshooting steps include 2 factory resets for both the latest firmware as well as an older firmware (to rule out a firmware bug in a more recent version).

I will reset to factory defaults with the latest firmware tomorrow to see if the problem persists. This will be redundant but hopefully this helps set the stage for the next step. The one thing is that I want to leverage both primary SIM cards so I will set up cloud fusion with a single location set to the automatic setting.

What should the next step be after that?

Jason

> On Apr 13, 2022, at 4:27 PM, peplinksupport@frontierus.com wrote:
>
> ﻿ Hi Jason,
> I'm reaching out in regards to your inquiry on your Peplink Transit Duo serial number 293A-7EB6-DE64 and a few issues you’re running into including the router requiring reboots, router temperature, and devices not connecting.  I've copied the Mobile Must Have team here as well.  As your Peplink Partner, Mobile Must Have is your primary contact for configuration assistance, troubleshooting, licensing etc.  You can reach them directly at support@mobilemusthave.com to help their whole team have insight to your issue.
> As a starting point I’d suggest a review of the configuration as there may be some things there that make the configuration convoluted.  You mention having 3 different SpeedFusion Cloud tunnels active.  Unless you’re looking to send traffic to particular regions and therefor route over different tunnels, One SpeedFusion cloud tunnel to the closest endpoint using the ‘automatic’ option should suffice.
>  I might also suggest doing a factory reset to give the router a fresh start.  It would be good to do this and run with a minimal configuration to see if issues persist prior to adding back in preferences and other settings.
> If things persist on the minimal/default configuration, we can help to escalate the issue.
>
> Thank you,
> -Topher
> Frontier Computer Corp
> Peplink Distributor
>
>
>
> Jason Younker (13 Apr 2022 11:46 PM)
>
>
>
> I have the following equipment:
>
> - Pepwave MAX Transit DUO "PrimeCare Edition" Dual CAT-12 LTEA Router
>
> - Poynting 7-in-1 4x Cellular, WIFI & GPS RV and Marine Roof Antenna for Dual Modem Applications
>
>
>
> We currently have speed fusion set up to the 3 best options considering our current location. Despite this, we are experiencing ongoing problems with the unit including:
>
> - frequent required reboots
>
> - router unit heating up beyond what is considered normal (judged by a mobile professional who perform an inspection on the unit)
>
> - some devices cannot connect
>
>
>
> Some of these issues are possible configuration or setup errors but the frequent reboots and hot unit are cause for concern. I would like to replace the unit in order to fix these issues.
>
>
> Deployment Status: Production / Live Network
>
> Allow Changes / Reboot Device: Yes
>
> You can use this link to view and reply to this ticket's thread:
> https://ticket.peplink.com/ticket-conversation/22040476
>
> or you can reply directly to this email.
>
> Peplink Ticketing System
> Copyright © 2022 Peplink. All rights reserved.
>
>
> ref:_00D6A2zSvx._5003uqlj5v:ref

---

## 2. 2022-04-14 08:48 — jason@ynkr.org

*Subject: Re: FCC Case #00028349 | [Peplink #22040476] Hardware Trouble?    [ ref:_00D6A2zSvx._5003uqlj5v:ref ]*

Good morning Chris,

Our device should not be offline. It is hard wired to ac power and my phone is currently connected. I suspect this is a symptom which will be temporarily resolved with a reboot but believe this issue is indicative of the larger problem.

Also, there will be no firmware upgrade as I am on the latest version. I will reboot at 930am CST.

Jason

> On Apr 14, 2022, at 6:48 AM, MobileMustHave - Support Department <support@mobilemusthave.com> wrote:
>
> ﻿
> Hi Jason,
>
> I am showing your device offline. Let me know how you make out after the firmware upgrade and I will remote in and take a look at your device.
>
> ​Thanks,
> Chris Tagg
> Nomadic Support Specialist
>
>
>
> On Wed, 13 Apr at 7:58 PM , Jason Younker <jason@ynkr.org> wrote:
> Topher,
>
> Thanks for the tips. Some of my troubleshooting steps include 2 factory resets for both the latest firmware as well as an older firmware (to rule out a firmware bug in a more recent version).
>
> I will reset to factory defaults with the latest firmware tomorrow to see if the problem persists. This will be redundant but hopefully this helps set the stage for the next step. The one thing is that I want to leverage both primary SIM cards so I will set up cloud fusion with a single location set to the automatic setting.
>
> What should the next step be after that?
>
> Jason
>
> On Apr 13, 2022, at 4:27 PM, peplinksupport@frontierus.com wrote:
>
> ﻿ Hi Jason,
> I'm reaching out in regards to your inquiry on your Peplink Transit Duo serial number 293A-7EB6-DE64 and a few issues you’re running into including the router requiring reboots, router temperature, and devices not connecting.  I've copied the Mobile Must Have team here as well.  As your Peplink Partner, Mobile Must Have is your primary contact for configuration assistance, troubleshooting, licensing etc.  You can reach them directly at support@mobilemusthave.com to help their whole team have insight to your issue.
> As a starting point I’d suggest a review of the configuration as there may be some things there that make the configuration convoluted.  You mention having 3 different SpeedFusion Cloud tunnels active.  Unless you’re looking to send traffic to particular regions and therefor route over different tunnels, One SpeedFusion cloud tunnel to the closest endpoint using the ‘automatic’ option should suffice.
>  I might also suggest doing a factory reset to give the router a fresh start.  It would be good to do this and run with a minimal configuration to see if issues persist prior to adding back in preferences and other settings.
> If things persist on the minimal/default configuration, we can help to escalate the issue.
>
> Thank you,
> -Topher
> Frontier Computer Corp
> Peplink Distributor
>
>
>
> Jason Younker (13 Apr 2022 11:46 PM)
>
> I have the following equipment:
> - Pepwave MAX Transit DUO "PrimeCare Edition" Dual CAT-12 LTEA Router
> - Poynting 7-in-1 4x Cellular, WIFI & GPS RV and Marine Roof Antenna for Dual Modem Applications
>
> We currently have speed fusion set up to the 3 best options considering our current location. Despite this, we are experiencing ongoing problems with the unit including:
> - frequent required reboots
> - router unit heating up beyond what is considered normal (judged by a mobile professional who perform an inspection on the unit)
> - some devices cannot connect
>
> Some of these issues are possible configuration or setup errors but the frequent reboots and hot unit are cause for concern. I would like to replace the unit in order to fix these issues.
>
> Deployment Status: Production / Live Network
> Allow Changes / Reboot Device: Yes
> You can use this link to view and reply to this ticket's thread:
> https://ticket.peplink.com/ticket-conversation/22040476
>
> or you can reply directly to this email.
> Peplink Ticketing System
> Copyright © 2022 Peplink. All rights reserved.
>
>
> ref:_00D6A2zSvx._5003uqlj5v:ref
> 43551:1714289

---

## 3. 2022-04-14 09:51 — jason@ynkr.org

*Subject: Re: FCC Case #00028349 | [Peplink #22040476] Hardware Trouble?    [ ref:_00D6A2zSvx._5003uqlj5v:ref ]*

Chris,

I just rebooted. Rather than do that for the 3rd time in 12 hours, I am going to switch to firmware 1 which is on 8.1.2, and will update that to the latest firmware. This should take about 30 minutes I would think.

Jason

> On Apr 14, 2022, at 8:55 AM, MobileMustHave - Support Department <support@mobilemusthave.com> wrote:
>
> ﻿
> Hi Jason,
>
> Ok, thank you.
>
> Chris Tagg
> Nomadic Support Specialist
>
>
>
> On Thu, 14 Apr at 9:48 AM , Jason Younker <jason@ynkr.org> wrote:
> Good morning Chris,
>
> Our device should not be offline. It is hard wired to ac power and my phone is currently connected. I suspect this is a symptom which will be temporarily resolved with a reboot but believe this issue is indicative of the larger problem.
>
> Also, there will be no firmware upgrade as I am on the latest version. I will reboot at 930am CST.
>
> Jason
>
> On Apr 14, 2022, at 6:48 AM, MobileMustHave - Support Department <support@mobilemusthave.com> wrote:
>
> ﻿
> Hi Jason,
>
> I am showing your device offline. Let me know how you make out after the firmware upgrade and I will remote in and take a look at your device.
>
> ​Thanks,
> Chris Tagg
> Nomadic Support Specialist
>
>
>
> On Wed, 13 Apr at 7:58 PM , Jason Younker <jason@ynkr.org> wrote:
> Topher,
>
> Thanks for the tips. Some of my troubleshooting steps include 2 factory resets for both the latest firmware as well as an older firmware (to rule out a firmware bug in a more recent version).
>
> I will reset to factory defaults with the latest firmware tomorrow to see if the problem persists. This will be redundant but hopefully this helps set the stage for the next step. The one thing is that I want to leverage both primary SIM cards so I will set up cloud fusion with a single location set to the automatic setting.
>
> What should the next step be after that?
>
> Jason
>
> On Apr 13, 2022, at 4:27 PM, peplinksupport@frontierus.com wrote:
>
> ﻿ Hi Jason,
> I'm reaching out in regards to your inquiry on your Peplink Transit Duo serial number 293A-7EB6-DE64 and a few issues you’re running into including the router requiring reboots, router temperature, and devices not connecting.  I've copied the Mobile Must Have team here as well.  As your Peplink Partner, Mobile Must Have is your primary contact for configuration assistance, troubleshooting, licensing etc.  You can reach them directly at support@mobilemusthave.com to help their whole team have insight to your issue.
> As a starting point I’d suggest a review of the configuration as there may be some things there that make the configuration convoluted.  You mention having 3 different SpeedFusion Cloud tunnels active.  Unless you’re looking to send traffic to particular regions and therefor route over different tunnels, One SpeedFusion cloud tunnel to the closest endpoint using the ‘automatic’ option should suffice.
>  I might also suggest doing a factory reset to give the router a fresh start.  It would be good to do this and run with a minimal configuration to see if issues persist prior to adding back in preferences and other settings.
> If things persist on the minimal/default configuration, we can help to escalate the issue.
>
> Thank you,
> -Topher
> Frontier Computer Corp
> Peplink Distributor
>
>
>
> Jason Younker (13 Apr 2022 11:46 PM)
>
> I have the following equipment:
> - Pepwave MAX Transit DUO "PrimeCare Edition" Dual CAT-12 LTEA Router
> - Poynting 7-in-1 4x Cellular, WIFI & GPS RV and Marine Roof Antenna for Dual Modem Applications
>
> We currently have speed fusion set up to the 3 best options considering our current location. Despite this, we are experiencing ongoing problems with the unit including:
> - frequent required reboots
> - router unit heating up beyond what is considered normal (judged by a mobile professional who perform an inspection on the unit)
> - some devices cannot connect
>
> Some of these issues are possible configuration or setup errors but the frequent reboots and hot unit are cause for concern. I would like to replace the unit in order to fix these issues.
>
> Deployment Status: Production / Live Network
> Allow Changes / Reboot Device: Yes
> You can use this link to view and reply to this ticket's thread:
> https://ticket.peplink.com/ticket-conversation/22040476
>
> or you can reply directly to this email.
> Peplink Ticketing System
> Copyright © 2022 Peplink. All rights reserved.
>
>
> ref:_00D6A2zSvx._5003uqlj5v:ref
> 43551:1714289

---
