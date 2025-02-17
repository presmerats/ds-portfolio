# Visualization Project: GoogleSheet with Youtube API Appscript

This project uses the Youtube API to scrape youtube channels related to a specific topic (insolvency laws in Spain) and visualizes them by views, likes and activity. The script runs on a daily basis so the visualizations are updated every day. The visualizations are shown in a [blog post](https://presmerats.github.io/data/visualization/googlesheets/2024/10/09/Google-sheets-Viz.html)


## Steps to open the AppScript Project consoles

First open the Appscript extension from your google sheeet

![Open Appscript](files://./img/1_open_app_script.png)

Then open the Appscript menu

![Open General meny](files://./img/1_open_app_script.png)

Click on your project's name

![Open you project](files://./img/1_open_app_script.png)

You can now modify your projects files


## Next Steps


* ok-Process batches to retrive a big list of channels
  * ok-set pageToken from value of nextPageToken
  * ok-For Loop, get size of results, append to results
  * ok-Add view count from a for loop, and sort 


* Encapsulate functions, use different files
    * ok-find last row of a column sorting by string
    * get unique list of values
    * retrieve a list with API
    * retrive a list from sheet
    * new mainLastVideos Function

* improve api usage
  * retrieve videos by date just once, continue from last video date
    * ok- save video ID in one column 
    * Retrieve last video date
    * Retrieve last row with stats
    * Check that nextPageToken is not empty, or null. If it is then break

  * Video stats
    * New videos -> retrieve during the previous loop 
    * Old videos ->
      * read video ID from the spreadsheet
      * query them in batches (what's the max input, and what's the max output?)
  
  * Channel stats
    * Get the channels from channel ID, 
    * Then do a Unique Channel ids list
    * then update statistics for each id (max input size, max output size?)

  
  * FINAL Improvement week schedule (may not be necessary)
    * day one, retrieve new videos from last date, update channel list
    * day 2, update video view and like counts (by batches?)
    * day 3, update channel list stats (by batches?)
    * Control internally in the script with today's date or day of the week date

* Add location to the videos to limit them to Spain 

* Filter some channels out (Suits, Esmeralda, )


* Visualizations
  * Videos 
    * Top 20 Recent videos (sorted by views)
    * Top 20 most viewed videos since 2024
    * Top 20 most liked videos since 2024
  * Channels
    * Top 20 - views
      * Top 20 channels by view count week to date
      * * Top 20 channels by view count month to date
      * * Top 20 channels by view count year to date
      * * Top 20 channels by view count for past 12 months
    * * Top 20 - likes
      * Top 20 channels by likes count week to date
      * * Top 20 channels by like count month to date
      * * Top 20 channels by like count year to date
      * * Top 20 channels by like count for past 12 months
    * * Top 20 - subscribers
      * Top 20 channels by subs count week to date
      * * Top 20 channels by subs count month to date
      * * Top 20 channels by subs count year to date
      * * Top 20 channels by sbus count for past 12 months
    * Top 20 - video counts
      * ... 7d, mtd , ytd, 1y
    * Evolution
      * monthly line chart - num videos
      * monthly line chart - num views
      * monthly line chart - num likes
      * monthly stacked barchart - num videos/channel
      * Avg num vids & num views per month per channle(grouped barchart per channel)