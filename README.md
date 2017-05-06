##  Description:

YT Music Video Share App

* Users can be registered and signed in the application
  * Users provide username and password
  * On login/register they receive an authorization key
    * It is used for all other operations

* Signed in users can:
  * Add a YouTube link to a song video:
    * Song items have title, description and link
  * Comment under an item
  * Give stars to an item

Song items can be sorted by date and username. Users can
add a song. Only five stars to give per day. Only songs with low
views and rating can be added (data queried from YT's data API)
The lower the views and rating, the higher the starting stars/underdog modifier. Comments are anonymous, one random comment is displayed
under the "watch video" box (slider). See also the initial design.png.

## Routes

Users and registration related, plus:

* `#/` - Home page
* `#/songs` - Get songs by user
* `#/songs/all` - Get all songs
* `#/songs/add` - Post new song item (title, description, link)
* `#/songs/id` - Get a specific song item
* `#/songs/id` - Delete song
* `#/songs/id/rate` - Post stars/rate
* `#/songs/id/comments` - Get comments for song
* `#/songs/id/comments/add` - Post new comment
* `#/songs/top` - Top 10 songs with most stars