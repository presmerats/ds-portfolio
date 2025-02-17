// @ts-nocheck
function getLastRowByStringColumnValue( sheet_name, column_num){
  
  var sheet = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName(sheet_name);

  var unfiltered = sheet.getRange(2, column_num, sheet.getLastRow()).getValues();

  // filter non empty values
  var colArray = unfiltered.filter(function (el) {
    return el != null && el != "";
  });
  
  //Logger.log(colArray.length)
  //Logger.log(colArray[0])
  //Logger.log(colArray[1])
  //Logger.log(colArray[colArray.length - 1])

  var colArraySorted = colArray.sort(function(a,b){
    //return ('' + a).localeCompare(b)
    if (a < b)
      return -1;
    if ( a > b)
      return 1;
    return 0;
    })

  var maxInColumn = colArraySorted[0][0];

  //Logger.log("Sorted array:") 
  //Logger.log(colArraySorted[0])
  //Logger.log(colArraySorted[1])
  //Logger.log(colArraySorted[colArraySorted.length - 1])
  
  var last_date = maxInColumn;

  return last_date;

}

function test_getLastRowByStringColumnValue(){
  last_date = getLastRowByStringColumnValue("LastVideos",4);
  Logger.log(last_date)
}

function getLastSheetRow( sheet_name){


  var sheet = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName(sheet_name);

  var last_row = sheet.getLastRow();

  return last_row;

}


function retrieveLastVideos(last_video_date){
  var searchQuery = "ley segunda oportunidad -asilo -inmigrante"
  //var searchQuery = "ley segunda oportunidad"

  var sr = YouTube.Search.list("snippet",{ q:searchQuery, order:"date", type:"video", maxResults:50, publishedAfter:last_video_date});

  // select fields to show
  var modRes = sr.items.map(function(v){ return [v.snippet.channelTitle,  v.snippet.channelID, v.snippet.title, v.id.videoId, v.snippet.publishedAt];});

  return modRes  
}


function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}



function getUniqueVideoIds(sheet_name, column_num){

  var sheet = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName(sheet_name);

  var unfiltered = sheet.getRange(2, column_num, sheet.getLastRow()).getValues();

  var idsArray = unfiltered.filter(onlyUnique);

  return idsArray;
  
}

function filterRepeatedVideos(videosList, currentVideoIds){
  // from object to ids list

  // find all that already exist in the old list (using an approach similar to filter?)
}


function videos_sheet_header(sheet_name){
  //sheet_name = "Videos"
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName(sheet_name);
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "Channel ID", "Title", "ID", "Date", "ID", "ViewCount", "LikeCount"];
    spsh.appendRow(headerRow);
  }
}



function mainTaskLastVideos(){
  // setup the sheet header
  videos_sheet_header("LastVideos")

  // get unique list of video IDs
  current_video_ids = getUniqueVideoIds("LastVideos",5);

  // get last video datetime 
  currentVideoIds = getLastRowByStringColumnValue("LastVideos",5);

  // get last row
  last_row = getLastSheetRow("LastVideos");

  // retrieve videos from the previous datetime (inclusive)
  videosList = retrieveLastVideos(last_video_date)

  // remove repeated IDs in the list
  filteredNewVideoList = filterRepeatedVideos(videosList, currentVideoIds)

  // get stats for those new videos

  // add videos to the sheet

  // update stats for old videos ( from row 2 to last row)

  // sort sheet by date ascending

}

function myFunction() {
  //var ui = SpreadsheetApp.getUi();
  //var searchQuery = ui.prompt("Enter the channel name: ").getResponseText();
  var searchQuery = "ley segunda oportunidad -asilo -inmigrante"

  // ---LastVideos -  Last 500 videos by date ------------------------------------------------------------------
  var sr = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"date", type:"video", maxResults:50, publishedAfter:"2024-01-01T00:00:00.0Z"});

  //write header 
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("LastVideos");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel","Channel ID", "Title", "ID", "Date"];
    spsh.appendRow(headerRow);
  }
  
  //loop variables
  var nextPageToken = sr.nextPageToken
  var current_row = 2

  for(let i = 0; i < 3; i++) {


    //write into the google sheet --------------
    // select fields to show
    var modRes = sr.items.map(function(v){ return [v.snippet.channelTitle,  v.snippet.title, v.id.videoId, v.snippet.publishedAt];});
    // write
    spsh.getRange(current_row, 1, modRes.length, modRes[0].length).setValues(modRes);
    

    
    // prepare next loop iteration  
    var sr2 = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"date", type:"video", maxResults:50, publishedAfter:"2024-01-01T00:00:00.0Z", pageToken:nextPageToken});

    nextPageToken = sr2.nextPageToken

    current_row = current_row + modRes.length

    //Logger.log(sr2.items[0])
    //if (sr2.items.length>0) {
    //  sr.items = sr.items.concat(sr2.items);
    //}
  }

  // sort by date ascending
    spsh.getRange(2, 1, modRes.length, modRes[0].length).sort({column: 4, ascending: true});



  // --- Videos - Top 50 videos by view count ----------------------------------------------------------
  //var sr = YouTube.Search.list("snippet",{ q:searchQuery, order:"viewCount" type:"video",relevanceLanguage:"es", maxResults:50, locationRadius: "1000km", location: "(40.416775,-3.703790)"});
  var sr = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"viewCount", type:"video", maxResults:50, publishedAfter:"2024-01-01T00:00:00.0Z"});

  // write header
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("Videos");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "Channel ID", "Title", "ID", "Date", "ID", "ViewCount", "LikeCount"];
    spsh.appendRow(headerRow);
  }

  // get loop vars
  var nextPageToken = sr.nextPageToken;
  var current_row = 2;

  for(let i = 0; i < 3; i++) {

    //write into the google sheet ----------
    // filted columns
    var modRes = sr.items.map(function(v){ return [v.snippet.channelTitle, v.snippet.channelId, v.snippet.title, v.id.videoId, v.snippet.publishedAt];});
    
    // write data
    spsh.getRange(current_row, 1, modRes.length, modRes[0].length).setValues(modRes);

    
    // add viewcount and likes ----------
    // get video ids
    var ids = modRes.map(function(res){ return res[3]}).join(",");
    
    // get stats for video ids
    var stats = YouTube.Videos.list("statistics", { id: ids});

    //Logger.log(stats)
    var vidStats = stats.items.map(function(res){return [res.id, res.statistics.viewCount, res.statistics.likeCount];});

    //Logger.log(vidStats);
    spsh.getRange(current_row, 6, vidStats.length, vidStats[0].length).setValues(vidStats );

    // increase the row index for next batch
    current_row = current_row + modRes.length;
    Logger.log(current_row)

    // process next batch. --------------
    var sr = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"viewCount", type:"video", maxResults:50, publishedAfter:"2024-01-01T00:00:00.0Z", pageToken:nextPageToken});

    nextPageToken = sr.nextPageToken


  }




  // ------ Channels -  Top Channels ------------------------------------------------------------------
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("Channels");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "ChannelID", "NumVids", "Subscribers", "Total Views"];
    spsh.appendRow(headerRow);
  }
  // add subscribers for each channel ------
  
  // get channel ids 
  var ids = modRes.map(function(res){ return res[1]}).join(",");
  
  // get id stats
  var stats = YouTube.Channels.list("snippet,statistics", { id: ids});
  
  //Logger.log(stats)
  
  // select stats to show
  var chanStats = stats.items.map(function(res){return [res.snippet.title, res.id, res.statistics.videoCount, res.statistics.subscriberCount, res.statistics.viewCount];});
 
  //Logger.log(chanStats);
  
  // write to sheet
  spsh.getRange(2, 1, chanStats.length, chanStats[0].length).setValues(chanStats );

  //Sort channels by Video Count descending(3), Subscribers(4), Views(5)
  spsh.getRange(2, 1, chanStats.length, chanStats[0].length).sort({column: 5, ascending: false});
  


  
}


