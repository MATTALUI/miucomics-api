
# Mix It Up! API
CONTENTS
* [Getting All Series](#getting-all-series)
* [Getting Issues Within A Series](#getting-issues-within-a-series)
* [Creating A New Series](#creating-a-new-series)
* [Creating A New Issue](#creating-a-new-issue)
* [Creating Stock For An Issue](#creating-stock-for-an-issue)
* [Increment or Decrement Stock](#increment-or-decrement-stock)
* [Change Stock Price](#change-stock-price)
* [Delete Series](#delete-series)
* [Webhooks](#webhooks)
* [Other Resources](#other-resources)


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
|Parameter|Type|Description|Required|
|-|-|-|-|
|itle| String | The title of a series| true|
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
NOTES:
* A newly-created series will have no issues, so a default `issue_cover` value of the [MIUComics logo](https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg) will be added to the returned object.
## Creating A New Issue
###### METHOD: POST
###### ENDPOINT:
```
/comics/issues
```
###### DESCRIPTION:
The request for posting a new issue can be sent as either `Content-Type : multipart/form-data` or `Content-Type : application/json`. However, if uploading an image, request must be sent as `Content-Type : multipart/form-data`. You can send the following information:
|Parameter|Type|Description|Required|
|-|-|-|-|
|series_id| Number | The id of the series the issue belongs to| true|
|number|Number|The issue number used to represent the issue within the series.|true|
|cover_image|File|An uploaded file to use as issue cover art. Can only be included if using `Content-Type : multipart/form-data`. Access to image will be made public on s3. If no `cover_image` is included, then the cover art for the issue will default to the [MIUComics logo](https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg).|false|
|pub_date|String|A string used to represent a date object. EX: `2017-09-11T21:42:12.546Z`|false|
|ebay|Boolean|A boolean value used to determine whether an issue and its stock information will be tracked in the Ebay stores. If not included, defaults to `false`.|false|
|shopify|Boolean|A boolean value used to determine whether an issue and its stock information will be tracked in the Shopify stores. If not included, defaults to `false`.|false|

###### EXAMPLE REQUEST BODY:
```javascript
{
	"series_id": 7,
	"number": 1,
	"pub_date": "2017-09-11T21:42:12.546Z",
	"ebay": true,
	"shopify": true
}
```
###### EXAMPLE RESPONSE BODY:
```javascript
{
    "id": 24,
    "series_id": 7,
    "number": 1,
    "cover_image": "https://s3.us-east-2.amazonaws.com/mixitupcomicimages/logo.jpg",
    "pub_date": "2017-09-11T06:00:00.000Z",
    "ebay": true,
    "shopify": true,
    "shopify_id": null
}
```
NOTES:
* Because the new issue information must be submitted with `Content-Type : multipart/form-data` to upload an `issue_cover`, issues and their relating stock information must be posted separately. For more information on posting an issue's stock information see [Creating Stock For An Issue](#creating-stock-for-an-issue).
* Becase the `shopify_id` is set durin the stock-adding phase, the `shopify_id` will come back as `null` in the response. Don't worry. It'll get taken care of :thumbsup:.
## Creating Stock For An Issue
###### METHOD: POST
###### ENDPOINT:
```
/comics/stock
```
###### DESCRIPTION:
The post route for adding new stock information will accept a `JSON` object with two parameters:
|Parameter|Type|Description|Required|
|-|-|-|-|
|issueId|Number|The id for the issue that the submitted stock information will be connected to.|true|
|stockInfo|Array|An array of stock objects.|true|

And each stock object must contain the following parameters:
|Parameter|Type|Description|Required|
|-|-|-|-|
|quantity| Number | The count of copies of the relevant issue in the relevant condition| true|
|condition|String|The condition describing the issues. Possible values are:  `Mint`, `Near Mint`, `Very Fine`, `Fine`, `Very Good`, `Good`, `Fair`, or `Poor`|true|
|price|Number|The price for the relevant issue of the relevant quality.|true|
###### EXAMPLE REQUEST BODY:
```javascript
{
	"issueId": 16,
	"stockInfo": [
		{"quantity":3, "condition":"Mint", "price":2.4},
		{"quantity":34, "condition":"Poor", "price":0.69}
		]
}
```
###### EXAMPLE RESPONSE:
```javascript
[
    {
        "id": 1571,
        "condition": "Mint",
        "price": 2.4,
        "quantity": 3,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1570,
        "condition": "Near Mint",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1572,
        "condition": "Very Fine",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1573,
        "condition": "Fine",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1574,
        "condition": "Very Good",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1575,
        "condition": "Good",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1576,
        "condition": "Fair",
        "price": 0,
        "quantity": 0,
        "issue_id": 16,
        "shopify_id": null
    },
    {
        "id": 1577,
        "condition": "Poor",
        "price": 0.69,
        "quantity": 34,
        "issue_id": 16,
        "shopify_id": null
    }
]
```
NOTES:
* Posting new stock information for an issue will create 8 stock objects in total, on representing each possible stock condition. Because of this, new stock should only be created once--at the same time that an issue is created. To edit the count or price of stock, use the [increment/decrement endpoint](#increment-or-decrement-stock) or the [stock price change endpoint](#change-stock-price).
* Having repeat values for `condition` in the `stockInfo` array will be accepted. When there are repeat conditions, the quantities will be added up. However, the price for the created stock information will be based on the price for the last occurance of a condition.
* When stock information is created for an issue, there are officially variants/items of an issue. It is at this point that a `shopify_id` will be added to the relevant issue--if the issue is being tracked on Shopify--and stock objects relating to that issue will also receive their own  `shopify_id`s
## Increment or Decrement Stock
###### METHOD: PUT & DELETE
###### ENDPOINT:
```
/comics/stock/:issueId
```
###### DESCRIPTION:
Incrementing and decrementing stock is pretty simple. Sending a single `JSON` object to the endpoint with one of the acceptable [stock `condition` values](#creating-stock-for-an-issue) will increment the `quantity` of the stock with the relevant id. The `PUT` method will increase it by one and the `DELETE` method will decrease it by one. The response will be a 202 Status.
###### EXAMPLE REQUEST BODY:
```javascript
{"condition":"Mint"}
```
## Change Stock Price
###### METHOD: PATCH
###### ENDPOINT:
```
/comics/stock/:issueId
```
###### DESCRIPTION:
You can update the price for a stock by sending an object to the endpoint with two parameters:

|Parameter|Type|Description|Required|
|-|-|-|-|
|condition|String|The condition describing the stock. Possible values are:  `Mint`, `Near Mint`, `Very Fine`, `Fine`, `Very Good`, `Good`, `Fair`, or `Poor`|true|
|price|Number|Prices can be either float values or integers, representing whole dollars.|true|
###### EXAMPLE REQUEST BODY:
```javascript
{ condition: 'Mint', price: 4.20 }
```
## Delete Series
###### METHOD: DELETE
###### ENDPOINT:
```
/comics/series/:seriesId
```
###### DESCRIPTION:
It's pretty easy, folks. Just send a `DELETE` request to the endpoint corresponding to the id of the series you want deleted. All `issues` and `stock` related to the deleted series will be cascade-deleted.
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
