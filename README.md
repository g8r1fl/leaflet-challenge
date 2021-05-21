# Leaflet - Challenge	

## Objective:
For this challenge the goal was to build a map that used an api to build points on the globe of earthquake data.  

For a bonus, we could make it interactive by having different map styles and layers.

## Results

This project wasn't as difficult as some of the others.  I started off with using a template from one of the activities from class. In that template, there was heavy use of functions which is how I started.  I could get the map to draw up on the DOM and there were markers(pins) at each location and I was able to add a popup with information about the event.

Then I started to tweak it to meet the requirements of the homework and my first challenge was passing the data that i needed for the cirlces to the createMap function.  I explored the json and tried to get the data.  I was able to but then there were two data sets to be sent to another function and I got errors.

In the end I decided to do all of the coding within the d3.json call of the api data and build it all there.  The next challenge was that I couldn't get the circles to work.  However, eventually by inspecting the html I realized that the circles were there but out of view.  I hadn't noticed that the coordinates were ordered in  Long, Lat and I needed the inverse.  That then put the cirlces on the map.

I was able to finalize and complete step 1 of the challenge but wasn't able to have the layer control.  I continuosly recieved errors and it wouldn't load.  Since I'm behind on homework assignments I am submitting it as is and will try to sort out the error for the bonus later.

