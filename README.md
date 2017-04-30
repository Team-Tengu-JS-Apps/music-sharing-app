##  Description:

YT Music Video Share App

* Users can be registered and signed in the application
  * Users provide username and password
  * On login/register they receive an authorization key
    * It is used for all other operations

* Signed in users can:
  * Add a YouTube video item:
    * Items have title, description and link
  * Comment under an item
  * Give stars to an item

Video items can be sorted by date and username. Users can
add a video item. Only five stars to give per day. Only videos with low
views and rating can be added (data queried from YT's data API)
The lower the views and rating, the higher the starting stars. Comments are anonymous, one random comment is displayed
in a text box under the video. See also the initial design.png.

## Routes

Users and registration related, plus:

* `#/home` - Home page
* `#/videos` - Get all videos
* `#/videos/add` - Post new video
* `#/videos/id` - Get a specific video item
* `#/videos/id/rate` - Post stars
* `#/videos/id/stats` - Get YT stats for video (not Node)
* `#/videos/id/comments` - Get comments for a video
* `#/videos/id/comments/add` - Post new comment
* `#/top` - Top 10 videos with most stars