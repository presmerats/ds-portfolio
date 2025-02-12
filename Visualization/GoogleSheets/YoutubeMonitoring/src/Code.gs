// @ts-nocheck
function myFunction() {
  //var ui = SpreadsheetApp.getUi();
  //var searchQuery = ui.prompt("Enter the channel name: ").getResponseText();
  var searchQuery = "ley segunda oportunidad -asilo -inmigrante"

  // --- Last 50 videos by date ------------------------------------------------------------------------
  var sr = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"date", type:"video", maxResults:1000, publishedAfter:"2024-01-01T00:00:00.0Z"});
  var modRes = sr.items.map(function(v){ return [v.snippet.channelTitle,  v.snippet.title, v.id.videoId, v.snippet.publishedAt];});
  //Logger.log(modRes)
  //write into the google sheet ------------------------------------
  //write header 
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("LastVideos");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "Title", "ID", "Date"];
    spsh.appendRow(headerRow);
  }
  // write data
  spsh.getRange(2, 1, modRes.length, modRes[0].length).setValues(modRes);
  // sort by date ascending
  spsh.getRange(2, 1, modRes.length, modRes[0].length).sort({column: 4, ascending: true});


  // --- Top 50 videos by view count ----------------------------------------------------------
  //var sr = YouTube.Search.list("snippet",{ q:searchQuery, order:"viewCount" type:"video",relevanceLanguage:"es", maxResults:50, locationRadius: "1000km", location: "(40.416775,-3.703790)"});
  var sr = YouTube.Search.list("snippet",{ q:"ley segunda oportunidad", order:"viewCount", type:"video", maxResults:50, publishedAfter:"2024-01-01T00:00:00.0Z"});
  //Logger.log(sr.items.forEach(function(vid){ vid.snippet.channelTitle;}));
  //Logger.log(sr.items.forEach(function(vid){ vid.snippet;}));
  var modRes = sr.items.map(function(v){ return [v.snippet.channelTitle, v.snippet.channelId, v.snippet.title, v.id.videoId, v.snippet.publishedAt];});
  //Logger.log(modRes)

  //write into the google sheet ------------------------------------
  //write header 
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("Videos");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "Channel ID", "Title", "ID", "Date", "ID", "ViewCount", "LikeCount"];
    spsh.appendRow(headerRow);
  }
  // write data
  spsh.getRange(2, 1, modRes.length, modRes[0].length).setValues(modRes);

  // add viewCounts for each video
  var ids = modRes.map(function(res){ return res[3]}).join(",");
  var stats = YouTube.Videos.list("statistics", { id: ids});
  //Logger.log(stats)
  var vidStats = stats.items.map(function(res){return [res.id, res.statistics.viewCount, res.statistics.likeCount];});
  //Logger.log(vidStats);
  spsh.getRange(2, 6, vidStats.length, vidStats[0].length).setValues(vidStats );


  // ------ Top Channels ------------------------------------------------------------------
  var spsh = SpreadsheetApp.openById("1GHqKXHm_ur_1mfHVBMaI58RKUttFxvhlGUTBQ3wEVhw").getSheetByName("Channels");
  var firstCell = spsh.getRange(1, 1,).getValue();
  if (firstCell != 'Channel') {
    var headerRow = [ "Channel", "ChannelID", "NumVids", "Subscribers", "Total Views"];
    spsh.appendRow(headerRow);
  }
  // add subscribers for each channel
  var ids = modRes.map(function(res){ return res[1]}).join(",");
  var stats = YouTube.Channels.list("snippet,statistics", { id: ids});
  //Logger.log(stats)
  var chanStats = stats.items.map(function(res){return [res.snippet.title, res.id, res.statistics.videoCount, res.statistics.subscriberCount, res.statistics.viewCount];});
 
  //Sort channels by num subscribers descending
  Logger.log(chanStats);
  spsh.getRange(2, 1, chanStats.length, chanStats[0].length).setValues(chanStats );
  spsh.getRange(2, 1, chanStats.length, chanStats[0].length).sort({column: 4, ascending: false});
  


  
}


