

document.addEventListener("spfdone", process);
document.addEventListener("DOMContentLoaded", process);

function process(){
	// pass the current related video div into ajax function
	function getVidLikes(div, id){
		// grab the anchor of the info section
		var anchor = div.getElementsByTagName('a')[0];
		// add a new span for like info to that anchor tag
		var newSpan = document.createElement("span"); 
  		newSpan.className = 'stat';
  		newSpan.id = id + '-likes';
		anchor.appendChild(newSpan);
		newSpan.style.display = 'none';
  		// get url for ajax load
  		var url = anchor.href;
  		// place like info in that new span
  		$(newSpan).load(url + ' .like-button-renderer.actionable ', function(){ 
  			var likes = newSpan.getElementsByTagName('span')[2].innerHTML;
  			var dislikes = newSpan.getElementsByTagName('span')[6].innerHTML;
  			// remove commas from text number
  			var likes = Number(likes.replace(',', ''));
  			var dislikes = Number(dislikes.replace(',', ''));
  			// parse into number
  			var breakingPoint = likes/(dislikes + likes);

  			var c = document.createElement("canvas");
  			c.width = 150;
  			c.height = 5;
  			var ctx = c.getContext("2d");
  			var breakPt = Math.floor(c.width * breakingPoint);
  			ctx.lineWidth = 2;
  			
  			ctx.beginPath();
  			ctx.strokeStyle = '#0000FF';
  			ctx.moveTo(0,2);
			ctx.lineTo(breakPt,2);
			ctx.stroke();
			
			ctx.beginPath();
			ctx.strokeStyle = '#FF0000';
			ctx.moveTo(breakPt,2);
			ctx.lineTo(c.width,2);
			ctx.stroke();

			newSpan.parentNode.appendChild(c);
  		});

 
    }

    // get all of the videos in the related sections
    $('.related-list-item.related-list-item-compact-video').each(function(index,val){
    	// pass the whole div to ajax function so we can update active DOM asynchronously
    	// if it is 'up next' section, we only need to go down one div (the id of the parent is not watch-related)
    	if (this.parentNode.id !== 'watch-related'){
			var relatedVidInfo = this.getElementsByTagName('div')[0];
    	} else {
    		var relatedVidInfo = this.getElementsByTagName('div')[0].getElementsByTagName('div')[0];	
    	}
    	getVidLikes(relatedVidInfo, index);
    })
}
