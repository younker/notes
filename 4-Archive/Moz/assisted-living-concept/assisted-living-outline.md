# Assisted Living

**original email from Justin**

```
Hey man,
 
My idea is to create a database of senior communities that includes more in
depth info than the typical “a place for mom” website. Here’s a couple of areas
that we could start with, and then just optimize the SEO to drive organic
traffic.
 
- List of all licensed communities in a given state (see attached excel list for
  WA), add as many attributes as possible

- Ownership info – it’s all public info but not sure the easiest way to gather
  it from each county/city.

- Operator info – I can start to gather this info, so searchers know if the
  community is run by a mom and pop operator or a national operator.

The thought would be to add sponsored content or advertising opportunities after
we have some significant traffic. So my question is how hard would it be to
create a database, and then build a website around that data?
 
Thanks,
 
Justin
```

**3/22/19 Email**

```
Here’s A Place for Mom’s insight on which states are the most/least transparent with some of the date we’re looking for:
https://www.aplaceformom.com/planning-and-advice/senior-housing-101/assisted-living-state-licensing
 
Ideas to monetize:
 
-  Pay for placement, ranking of results
-  Ability to respond (example, responding to citations)
-  Enhanced content from Owner or Operator
```

## Criteria
- updated monthly (at a minimum)
- ...?

## POC
Write a program to consume row 526 (Fieldstone Memory Care) and spit out the following:
- name: Fieldstone Memory Care
- owner: Chp Yakima Wa Owner Llc
- reports:
  - 02/2018 - Enforcement Letter
  - 09/2018 - Fire Inspection
  - 04/2017 - Fire Inspection
  - 01/2017 - Fire Inspection
  - 07/2018 - Inspection
  - 01/2017 - Inspection
  - 03/2018 - Investigation

## Step 1: Seed Data
- [x] Find API providing data found in CSV from https://fortress.wa.gov/dshs/adsaapps/Lookup/BHAdvLookup.aspx (also in curr dir)

Found!
http://geo.wa.gov/datasets/WADSHS::dshs-assisted-living-facilities

- DSHS Adult Family Homes
  - 2,966 rows
  - http://geo.wa.gov/datasets/WADSHS::dshs-adult-family-homes/geoservice
  - found 1 Fieldstone facility
    * Fieldstone Adult Family Home Yakima

- DSHS Assisted Living Facilities
  - 542 rows
  - http://geo.wa.gov/datasets/WADSHS::dshs-assisted-living-facilities/geoservice
  - found 9 Fieldstone facilities

## Step 2: Locate Owner
1. get `FacilityName` & `LocationCounty`
2. submit form: https://fortress.wa.gov/doh/facilitysearch/default.aspx
3. scrape & follow results
4. Owner's Name along with license

## Step 3: Find LLC


## Step 3: Locale Operator
1. https://secure.lni.wa.gov/verify/
2. Fill out form
  - search by: name
  - enter `FacilityName` into textfield
  * the field has a char limit
3. Pick a result (filter out `License: Inactive`)
4. Top Section:
  - `Owner or tradesperson: WAYNE PURDOM`
  - `Doing business as: FIELDSTONE GRANDRIDGE`
  - `WA UBI No. 603 537 805`

## Step 2: Locate Operator
1. get `LocationCounty` field from response
2. for that county, find the county assessor website
  - google 'adams county washington assessor'
  - http://www.co.adams.wa.us/departments/assessor/index.php
3. find real estate ownership search
  - adams == "property searches" == tax sifter
  - http://adamswa.taxsifter.com/Search/results.aspx?q=430%20N%202nd%20Ave
4. search using the address
5. find owner from results

*Resources*
- links to WA county assessor (and tresury) sites. You can use this to find all the disperate websites to crawl

*Yakima Co.*
- Yakima Co. Assessors: https://dor.wa.gov/find-taxes-rates/property-tax/county-assessor-and-treasurer-websites

The data for `http://www.yakimacounty.us/627/Parcel-Search` is retrieved via 2 ajax calls:
```
curl 'http://yes.co.yakima.wa.us/AssessorAPI/ParcelDetails/GetBySitusString/4120%20Englewood%20Ave' -H 'Accept: application/json' --compressed | pretty-print

[
  {
    "Id": 470226,
    "ParcelNumber": "181322-21454",
    "OwnerName": "Chp Yakima Wa Owner Llc",
    "SitusAddress": "4120 Englewood Ave, Yakima"
  }
]
```

```
curl 'http://yes.co.yakima.wa.us/AssessorAPI/ParcelDetails/GetByParcelNumber/181322-21454' -H 'Accept: application/json' --compressed | pretty-print

{
  "Id": 470226,
  "LinkId": 2190039,
  "ParcelNumber": "181322-21454",
  "OwnerRecords": [
    {
      "Name": "Chp Yakima Wa Owner Llc"
    }
  ],
  "SitusAddresses": [
    {
      "AddressString": "4120 Englewood Ave",
      "City": "Yakima",
      "StateAbbr": "WA",
      "ZipCode": "98908"
    }
  ],
  "Residences": [],
  "MobileHomes": [],
  "LandRecords": [
    {
      "Recid1": 1,
      "LandFlag": "C",
      "SoilClass": null,
      "CalcCU": "No",
      "WaterSource": "Public",
      "SewerSource": "Public",
      "FloodPlain": "No",
      "LotShape": "Irregular",
      "Topography": "Level",
      "LandView": "No View",
      "Landscaping": "Very Good",
      "ValueMethod": "Sq-Feet",
      "Lots": "0",
      "Squarefeet": "94634",
      "Acres": "2.170"
    }
  ],
  "CropRecords": [],
  "DetachedStructures": [],
  "ValueRecords": [
    {
      "ValueLabel": "Taxable Value Regular",
      "FirstYear": "2019",
      "Year0": 4301200,
      "Year1": 4149600,
      "Year2": 3817700,
      "Year3": 3817700,
      "Year4": 3817700,
      "Year5": 567800,
      "Year6": 567800
    },
    {
      "ValueLabel": "Taxable Value Excess",
      "FirstYear": "2019",
      "Year0": 4301200,
      "Year1": 4149600,
      "Year2": 3817700,
      "Year3": 3817700,
      "Year4": 3817700,
      "Year5": 567800,
      "Year6": 567800
    },
    {
      "ValueLabel": "Market Land",
      "FirstYear": "2019",
      "Year0": 567800,
      "Year1": 567800,
      "Year2": 567800,
      "Year3": 567800,
      "Year4": 567800,
      "Year5": 567800,
      "Year6": 567800
    },
    {
      "ValueLabel": "Market Improvement",
      "FirstYear": "2019",
      "Year0": 3733400,
      "Year1": 3581800,
      "Year2": 3249900,
      "Year3": 3249900,
      "Year4": 3249900,
      "Year5": 0,
      "Year6": 0
    },
    {
      "ValueLabel": "New Construction",
      "FirstYear": "2019",
      "Year0": 0,
      "Year1": 0,
      "Year2": 0,
      "Year3": 0,
      "Year4": 3249900,
      "Year5": 0,
      "Year6": 0
    }
  ],
  "TaxLevyRecords": [
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.225889001992,
      "RegularRate": 0.225889001992,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 128.26,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.090334782504,
      "RegularRate": 0.090334782504,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 51.29,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Juvenile Justice Bond",
      "LevyTypeCode": "ELR",
      "LevyRate": 0.000130066685,
      "RegularRate": 0,
      "ExcessRate": 0.000130066685,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 0.07
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.511610763769,
      "RegularRate": 2.511610763769,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 1426.09,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 3.08949700449,
      "RegularRate": 3.08949700449,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 1754.22,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima City Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 0.0540941802,
      "RegularRate": 0,
      "ExcessRate": 0.0540941802,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 30.71
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.74928416055,
      "RegularRate": 1.74928416055,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 993.24,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.660729432303,
      "RegularRate": 0,
      "ExcessRate": 1.660729432303,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 942.96
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 3.038459322999,
      "RegularRate": 0,
      "ExcessRate": 3.038459322999,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 1725.24
    },
    {
      "TaxYear": "2013",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.476325328739,
      "RegularRate": 0.476325328739,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 270.46,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.25,
      "RegularRate": 0.25,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 141.95,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.091314806536,
      "RegularRate": 0.091314806536,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 51.85,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.614897752333,
      "RegularRate": 2.614897752333,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 1484.74,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 3.118785963042,
      "RegularRate": 3.118785963042,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 1770.85,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima City Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 0.019719533451,
      "RegularRate": 0,
      "ExcessRate": 0.019719533451,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 11.2
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.764579134028,
      "RegularRate": 1.764579134028,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 1001.93,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.700932070605,
      "RegularRate": 0,
      "ExcessRate": 1.700932070605,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 965.79
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 3.1315785907,
      "RegularRate": 0,
      "ExcessRate": 3.1315785907,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 0,
      "ExcessTax": 1778.11
    },
    {
      "TaxYear": "2014",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.481219063635,
      "RegularRate": 0.481219063635,
      "ExcessRate": 0,
      "RegularValue": 567800,
      "ExcessValue": 567800,
      "RegularTax": 273.24,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.248143907504,
      "RegularRate": 0.248143907504,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 947.34,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.090248323254,
      "RegularRate": 0.090248323254,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 344.54,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.264494921302,
      "RegularRate": 2.264494921302,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 8645.16,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 3.123874027631,
      "RegularRate": 3.123874027631,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 11926.01,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.700377907176,
      "RegularRate": 1.700377907176,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 6491.53,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.683458655694,
      "RegularRate": 0,
      "ExcessRate": 1.683458655694,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 6426.94
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 3.115439593242,
      "RegularRate": 0,
      "ExcessRate": 3.115439593242,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 11893.81
    },
    {
      "TaxYear": "2015",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.476158609297,
      "RegularRate": 0.476158609297,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 1817.83,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.246806261863,
      "RegularRate": 0.246806261863,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 942.23,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.089759380938,
      "RegularRate": 0.089759380938,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 342.67,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.255046302979,
      "RegularRate": 2.255046302979,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 8609.09,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 3.087885530636,
      "RegularRate": 3.087885530636,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 11788.62,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.681467707979,
      "RegularRate": 1.681467707979,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 6419.34,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.681560077214,
      "RegularRate": 0,
      "ExcessRate": 1.681560077214,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 6419.69
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 3.125242724679,
      "RegularRate": 0,
      "ExcessRate": 3.125242724679,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 11931.24
    },
    {
      "TaxYear": "2016",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.474555968628,
      "RegularRate": 0.474555968628,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 1811.71,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.246205045149,
      "RegularRate": 0.246205045149,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 939.94,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.089535298964,
      "RegularRate": 0.089535298964,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 341.82,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.054931554679,
      "RegularRate": 2.054931554679,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 7845.11,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 3.083001083398,
      "RegularRate": 3.083001083398,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 11769.97,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.667900573785,
      "RegularRate": 1.667900573785,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 6367.54,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.611629005716,
      "RegularRate": 0,
      "ExcessRate": 1.611629005716,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 6152.72
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 3.022105908612,
      "RegularRate": 0,
      "ExcessRate": 3.022105908612,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 0,
      "ExcessTax": 11537.49
    },
    {
      "TaxYear": "2017",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.473665054003,
      "RegularRate": 0.473665054003,
      "ExcessRate": 0,
      "RegularValue": 3817700,
      "ExcessValue": 3817700,
      "RegularTax": 1808.31,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.239606877487,
      "RegularRate": 0.239606877487,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 994.27,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.087134428644,
      "RegularRate": 0.087134428644,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 361.57,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.98482106955,
      "RegularRate": 1.98482106955,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 8236.21,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "State School Levy Part 2",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.083563300945,
      "RegularRate": 1.083563300945,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 4496.35,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.994152537244,
      "RegularRate": 2.994152537244,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 12424.54,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.620081744034,
      "RegularRate": 1.620081744034,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 6722.69,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.572852991919,
      "RegularRate": 0,
      "ExcessRate": 1.572852991919,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 0,
      "ExcessTax": 6526.71
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "Yakima School M&O",
      "LevyTypeCode": "ELR",
      "LevyRate": 2.93518299713,
      "RegularRate": 0,
      "ExcessRate": 2.93518299713,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 0,
      "ExcessTax": 12179.84
    },
    {
      "TaxYear": "2018",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.460903146803,
      "RegularRate": 0.460903146803,
      "ExcessRate": 0,
      "RegularValue": 4149600,
      "ExcessValue": 4149600,
      "RegularTax": 1912.56,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "County Ems",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.224828569309,
      "RegularRate": 0.224828569309,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 967.03,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "County Flood Control",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.081759777939,
      "RegularRate": 0.081759777939,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 351.67,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "State School Levy",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.989034901834,
      "RegularRate": 1.989034901834,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 8555.24,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "State School Levy Part 2",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.739203338742,
      "RegularRate": 0.739203338742,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 3179.46,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "Yakima City",
      "LevyTypeCode": "RLR",
      "LevyRate": 2.813677841275,
      "RegularRate": 2.813677841275,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 12102.19,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "Yakima County",
      "LevyTypeCode": "RLR",
      "LevyRate": 1.516601055694,
      "RegularRate": 1.516601055694,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 6523.2,
      "ExcessTax": 0
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "Yakima School",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.5,
      "RegularRate": 0,
      "ExcessRate": 1.5,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 0,
      "ExcessTax": 6451.8
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "Yakima School Bonds",
      "LevyTypeCode": "ELR",
      "LevyRate": 1.481648983254,
      "RegularRate": 0,
      "ExcessRate": 1.481648983254,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 0,
      "ExcessTax": 6372.87
    },
    {
      "TaxYear": "2019",
      "TaxCodeArea": null,
      "District": "Yakima Valley Regional Library",
      "LevyTypeCode": "RLR",
      "LevyRate": 0.434543226736,
      "RegularRate": 0.434543226736,
      "ExcessRate": 0,
      "RegularValue": 4301200,
      "ExcessValue": 4301200,
      "RegularTax": 1869.06,
      "ExcessTax": 0
    }
  ],
  "SegregationRecords": [
    {
      "SegMergeID": 27254,
      "SegMergeNumber": "SM980006",
      "SegMergeType": "Short Plat",
      "DocumentNumber": "SP 96-133 & SP 97-34",
      "ParentYear": "1998",
      "ChildYear": "1998",
      "StatusDate": "1997-10-21T00:00:00",
      "Status": "Completed",
      "ParcelInvolvement": "Child",
      "SegregationImage": null,
      "SegregationDocument": {
        "Id": 1,
        "ImagePath": "\\AssessorAPI\\segDocumentImages\\SM980006.pdf",
        "ImageDate": "8/4/2017"
      },
      "ParcelsIncluded": [
        {
          "PropertyID": 30804,
          "ParcelNumber": "181322-21451",
          "Active": "No",
          "Involvement": "Parent",
          "Status": "Terminated",
          "Size": null
        },
        {
          "PropertyID": 470225,
          "ParcelNumber": "181322-21453",
          "Active": "Yes",
          "Involvement": "Child",
          "Status": "Continued",
          "Size": "2.50 Acre(s)"
        },
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": "Child",
          "Status": "Continued",
          "Size": "2.17 Acre(s)"
        }
      ]
    }
  ],
  "SaleRecords": [
    {
      "ExciseID": 166304,
      "ExciseNumber": "439804",
      "GrantorName": "Fieldstone Mc Jv Llc",
      "ExciseDate": "2015-03-31T00:00:00",
      "SalePrice": 11879000,
      "DocumentType": "Warranty Deed",
      "SaleVerify": null,
      "Portion": "No",
      "ParcelsIncluded": [
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": null,
          "Status": null,
          "Size": null
        }
      ]
    },
    {
      "ExciseID": 153202,
      "ExciseNumber": "431141",
      "GrantorName": "Peaceful Rest Llc",
      "ExciseDate": "2013-06-05T00:00:00",
      "SalePrice": 850000,
      "DocumentType": "Statutory Warranty Deed",
      "SaleVerify": null,
      "Portion": "No",
      "ParcelsIncluded": [
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": null,
          "Status": null,
          "Size": null
        }
      ]
    },
    {
      "ExciseID": 150303,
      "ExciseNumber": "429030",
      "GrantorName": "Taylor, Michael A",
      "ExciseDate": "2012-12-20T00:00:00",
      "SalePrice": 650000,
      "DocumentType": "Real Estate Contract",
      "SaleVerify": null,
      "Portion": "No",
      "ParcelsIncluded": [
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": null,
          "Status": null,
          "Size": null
        }
      ]
    },
    {
      "ExciseID": 17010,
      "ExciseNumber": "308208",
      "GrantorName": "Summit Accommodators",
      "ExciseDate": "1998-02-17T00:00:00",
      "SalePrice": 0,
      "DocumentType": "Quit Claim Deed",
      "SaleVerify": null,
      "Portion": "No",
      "ParcelsIncluded": [
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": null,
          "Status": null,
          "Size": null
        }
      ]
    },
    {
      "ExciseID": 13774,
      "ExciseNumber": "307481",
      "GrantorName": "Taylor",
      "ExciseDate": "1998-01-07T00:00:00",
      "SalePrice": 407500,
      "DocumentType": "Statutory Warranty Deed",
      "SaleVerify": null,
      "Portion": "No",
      "ParcelsIncluded": [
        {
          "PropertyID": 470226,
          "ParcelNumber": "181322-21454",
          "Active": "Yes",
          "Involvement": null,
          "Status": null,
          "Size": null
        }
      ]
    }
  ],
  "CommercialRecords": [
    {
      "LinkId": 2190039,
      "Recid1": 101,
      "BldgType": "Mult Res-Assised",
      "ExtWallType": "Frame",
      "Foundation": "Yes",
      "Construction": "Wood-Frame",
      "Quality": "Good",
      "Condition": "Very-Good",
      "HeatCoolType": "Package-A/C",
      "YearBuilt": 2013,
      "EffYearBuilt": 2013,
      "GroundFloorArea": 29752,
      "NumStories": 1,
      "CommercialGroups": [],
      "CommercialAmenities": []
    }
  ],
  "LevyYears": [
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013"
  ],
  "PropertyImages": [
    {
      "Id": 0,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-2.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 1,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-3.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 2,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-4.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 3,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-5.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 4,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-6.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 5,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-7.jpg",
      "ImageDate": "8/3/2017"
    },
    {
      "Id": 6,
      "ImagePath": "\\AssessorAPI\\pImages\\181322\\21454-8.jpg",
      "ImageDate": "8/3/2017"
    }
  ],
  "CurrentUseRemovalYears": [],
  "TcaNumber": "335",
  "NBHD": "C306",
  "PropertyUse": "65 Service - Professional",
  "PropertyUseCode": "65",
  "Acres": "2.17000000",
  "AbbreviatedLegal": "Section 22  Township 13  Range 18  Quarter NW:   SP 966-133   Lot   B    AS AMENDED BY SP 7001222",
  "GovernmentExempt": "",
  "HasSegregations": null,
  "HasSales": null,
  "CurrentYear": "2019",
  "Gas": "Yes",
  "Electric": "Yes",
  "Water": "Public",
  "Sewer": "Public",
  "PropertyType": "Commercial",
  "Zoning": "B1",
  "StreetType": "Two-Way",
  "StreetFinish": "Paved/Asphlt",
  "Traffic": "Light",
  "SideWalk": "Yes",
  "Curbs": "Yes",
  "Location": "Road-Frntage"
}
```



*Step 3: List Reports*
1. from seed data CSV, use col AE, which is a url
2. from that URL, extract:
  - date or report
  - report type/name
  - pdf or url for report pdf

## ArcGIS REST API
http://geo.wa.gov/datasets/WADSHS::dshs-assisted-living-facilities

*other*
- http://geo.wa.gov/search?collection=Dataset&q=assisted%20living
- http://geo.wa.gov/datasets/WADSHS::dshs-assisted-living-facilities/geoservice
- https://developers.arcgis.com/rest/services-reference/query-feature-service-layer-.htm
- https://services2.arcgis.com/WW3T8U6q5EkZ9U3n/arcgis/rest/services/GDL_DSHS_Assisted_Living_Facility/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json
- http://geo.wa.gov/datasets/WADSHS::dshs-adult-family-homes/data


*Ste 4: Find Operator*
- find the website
- scrape the website for the operator

## Related

- [[Moz MOC]]
- [[SHIP MOC]] - The SHIP project (in 2-Areas/SHIP — Senior Housing/) is the modern continuation of this 2018 idea
