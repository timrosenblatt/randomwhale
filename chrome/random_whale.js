/* Hi! And, thanks for checking out my code. What do you think?
   Drop me a line: tim@timrosenblatt.com
*/

var RandomWhale = {
  quotes: ["Remeber the good old days?<br />Now, get off my lawn, ya darn kids!",
           "Lift me, mighty birds!",
           "<a href='http://search.twitter.com/search?q=%22twitter+is+down%22' target='_blank'>Haters.</a> :P",
           "<a href='http://www.google.com/search?q=%22pivotal+labs%22+twitter' target='_blank'>Pivotal killed the Whale.</a> :D",
           "<a href='http://whentwitterisdown.com/' target='_blank'>When Twitter is down...</a>",
           "Too many tweets! Please wait a moment and try again.", // The Classic message
           "<a href='http://en.wikipedia.org/wiki/Beluga_whales' target='_blank'>Beluga whales</a> are known as &quot;canaries of the sea&quot;<br />due to their high-pitched twitter"],
                
  test_for_whale: function () {
    var handle = RandomWhale.get_document_handle();

    if(handle.test) {return false;}
    handle.test = true;
        
    if(handle.location.toString().match(/twitter.com/)) {
      var odds = Math.floor(Math.random() * 5);
      if(odds == 1) {
        RandomWhale.show_whale();
      }
    }
  },
    
  show_whale: function () {
    body   = RandomWhale.get_body_handle();
    handle = RandomWhale.get_document_handle();
    
    if(body==null || handle==null) { return false; } // This could be improved with some nice exception handling
                  
    var the_quote = RandomWhale.quotes[ Math.floor( Math.random() * RandomWhale.quotes.length ) ];
        
    var content_div = handle.createElement('div');
    /* 
    * There seems to be an odd quirk where FF will close tags that are in a single
    * part of the string. Could look into it in the future, but this isn't
    * too much code for right now.
    */
    content_div.innerHTML  = "<link type='text/css' rel='stylesheet' href='chrome://randomwhalechrome-public/content/styles/random_whale.css'></link><script type='text/javascript' src='chrome://randomwhalechrome-public/content/javascripts/random_whale.js'></script><div id='random-whale-ext-tint'>&nbsp;</div><div id='random-whale-ext-image-wrapper'><img id='random-whale-ext-image' src='chrome://randomwhalechrome-public/content/images/failwhale.gif' onclick='create_event(\"remove-whale\");' /><p>"+the_quote+"</p></div>";
    
    content_div.setAttribute('id', 'fail_whale_container');
    body.appendChild(content_div);
    
    document.getElementById('randomwhale-status-bar-panel').onclick = RandomWhale.remove_whale;
    document.getElementById('randomwhale-status-bar-panel').tooltiptext = "Click to hide the Whale";
    
  },
  
  remove_whale: function () {
    body   = RandomWhale.get_body_handle();
    handle = RandomWhale.get_document_handle();
    
    if(body==null || handle==null) { return false; } // This could be improved with some nice exception handling
    
    var x = handle.getElementById('fail_whale_container');
    x.parentNode.removeChild(x);
    
    document.getElementById('randomwhale-status-bar-panel').onclick = RandomWhale.show_whale;
    document.getElementById('randomwhale-status-bar-panel').tooltiptext = "Click to show the Whale";
  },
    
  get_document_handle: function () {
	  if (window.content && window.content.document) { /* The .content method is allegedly the official var now */
      //Firebug.Console.log("get_document_handle returned .content -- best");
		  return window.content.document;
	  }
	  else if (window._content && window._content.document) { /* The _content was deprecated by Mozilla */
      //Firebug.Console.log("get_document_handle returned ._content - second best");
		  return window._content.document;
	  }
	  else {
      //Firebug.Console.log("get_document_handle returned null");
		  return null;
	  }
	},
	
	get_body_handle: function () {
		var handle = RandomWhale.get_document_handle();
		
		if(handle && handle.getElementsByTagName && handle.getElementsByTagName("body") && 
		   handle.getElementsByTagName("body")[0]) {
			return handle.getElementsByTagName("body")[0];
		}
		
		return null;
	},
    
  init: function () {
    document.getElementById('randomwhale-status-bar-panel').label = "RandomWhale";
  }
}

/* Errors from functions called when the browser is still loading
aren't always caught in the Error Console. When something isn't
working and it's supposed to happen at startup, keep this in mind. */
document.addEventListener("focus", RandomWhale.test_for_whale, true);

document.addEventListener("random-whale-remove-whale", RandomWhale.remove_whale, false, true);

window.addEventListener("load", RandomWhale.init, false);


