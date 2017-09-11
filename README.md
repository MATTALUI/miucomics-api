
# Mix It Up! API
## Getting All Series
###### METHOD: GET
###### ENDPOINT:
```
/comics/series
```
###### DESCRIPTION:
The endpoint for getting all series will return an array of objects representing a series, along with all of the cover art for issues within a given series. Each series will have the following keys:
|Key|Type|Description|
|-|-|-|
|id| Number | The id of a series.|
|volume|Number|The volume number of a series.|
|title|String|The title of a series.|
|issue_covers|Array|An array of urls to the cover images of the issues in the series.|
###### EXAMPLE RESPONSE:
```javascript
    [{
        "id": 3,
        "title": "Flat Track Furies",
        "volume": 1,
        "issue_covers": [
            "https://s3.us-east-2.amazonaws.com/mixitupcomicimages/flattrack1-1.png",
            "https://s3.us-east-2.amazonaws.com/mixitupcomicimages/flattrack+1-2.jpg"
        ]
    }]
```

## Getting Issues Within A Series
###### METHOD: GET
###### ENDPOINT:
```
/comics/series/:seriesId
```
###### DESCRIPTION:
The endpoint for getting all issues within a series will return an array of objects representing issues within a series, as well as the stock breakdown for each issue. Each issue will have the following keys:
|Key|Type|Description|
|-|-|-|
|id|Number|The id value for the issue.|
|series_id|Number|The id value of the series that the issue belongs to.|
|number|Number|The issue number.|
|cover_image|String|A url referenceing the cover art for the issue. If no image was uploaded at the creation of the issue, the url will default to the [MIUComics logo](https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg).|
|pub_date|String|A date string representing the publish date for an issue. May be `Null`.|
|ebay|Boolean|A boolean value representing whether or not an issue's information is being tracked on the Ebay store.|
|shopify|Boolean|A boolean value representing whether or not an issue's information is being tracked on the Shopify store.|
|shopify_id|Number|The id of the Shopify Product coresponding to the issue. If the issue is not being tracked on Shopify, will be `Null`.|
|stock|Array|An array representing the simplified stock objects that belong to the issue. Each simplified stock object will only have `condition`, `price`, and `quantity`.|
###### EXAMPLE RESPONSE:
```javascript
[
    {
        "id": 12,
        "series_id": 3,
        "number": 1,
        "cover_image": "https://s3.us-east-2.amazonaws.com/mixitupcomicimages/flattrack1-1.png",
        "pub_date": "2017-09-08T06:00:00.000Z",
        "ebay": false,
        "shopify": false,
        "shopify_id": null,
        "stock": [
            {
                "condition": "Near Mint",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Very Fine",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Fine",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Very Good",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Good",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Fair",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Poor",
                "price": 0,
                "quantity": 0
            },
            {
                "condition": "Mint",
                "price": 0,
                "quantity": 0
            }
        ]
    }]
```
## Creating A New Series
###### METHOD: POST
###### ENDPOINT:
```
/comics/series
```
###### DESCRIPTION:
Posting a JSON object to the new series endpoint will create a new series in the databse and return the information for the newly-created series object. You can send an object with the following keys:
|parameter|type|description|required|
|-|-|-|-|
|title| String | The title of a series| true|
|volume|Number|The volume number of a series|true|
###### EXAMPLE REQUEST BODY:
```javascript
{
	"title": "Captain Matt",
	"volume": 4
}
```
###### EXAMPLE RESPONSE:
```javascript
{
    "id": 12,
    "title": "Captain Matt",
    "volume": 4,
    "issue_covers": [
        "https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg"
    ]
}
```
NOTE: A newly-created series will have no issues, so a default `issue_cover` value of the [MIUComics logo](https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg) will be added to the returned object.
## Creating A New Issue

|parameter|type|description|required|
|-|-|-|-|
|series_id| Number | the id of the series the issue belongs to| true|
|series_title|String|||

## Creating Stock For An Issue
[a link to a heading](#getting-all-series)
###### METHOD:
###### ENDPOINT:
###### DESCRIPTION:
###### EXAMPLE RESPONSE:
## Webhooks
The following routes have been added for API webhook requests:
```
/webhook/shopify
```
```
/webhook/square
```

#### Other Resources
[Developer Notes](https://github.com/MATTALUI/miucomics-api/tree/docs/docs)
