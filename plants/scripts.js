(function($) {
	$(document).ready(function () {
		
	$( window ).resize(function() {
	  land_squares();
	  return false;
	});
		
		
	// SET-UP PARAMETERS FOR THE MODEL
	var gridN = 6;
	var Years = 5;
	var nRuns = 0;
	var landscape = "";
	var weed_species = "";
	var sim_log =["Sim","Land","Plant"].concat(matrix_indices(gridN) ); // log for simulation results
	var log_string = sim_log.join("\t");
	
	// STORE INFO ABOUT WEEDS AND LANDSCAPES
	var occ = [];
	var w1p = 1/8;
	var w2p = 1/20;
	var w3p = .3;
	var w4p = 1/2;
	var lands = { 
			'land1' : { 
				'weed1' : [ [0, 0, 0, 0, 0, 0], 
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[1, 1, 1, 1, 0, 0]
						  ],
				'weed2' : [ [0, 0, 0, 0, 0, 0], 
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[1, 1, 1, 1, 0, 0]
						  ],
				'weed3' : [ [0, 0, 0, 0, 0, 0], 
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[1, 1, 1, 1, 0, 0]
						  ],
				'weed4'	: [ [0, 0, 0, 0, 0, 0], 
							[w4p, w4p, w4p, w4p, w4p, w4p],
							[w4p, w4p, w4p, w4p, w4p, w4p],
							[w4p, w4p, w4p, w4p, w4p, w4p],
							[w4p, w4p, w4p, w4p, w4p, w4p],
							[1, 1, 1, 1, 0, 0]
						  ]
			},
			'land2' : { 
				'weed1' : [ [0, 0, 0, 0, 0, 0], 
							[0, w1p, w1p, w1p, w1p, 0],
							[0, w1p, w1p, w1p, w1p, 0],
							[0, w1p, w1p, w1p, w1p, 0],
							[0, w1p, w1p, w1p, w1p, 0],
							[0, 0, 0, 0, 0, 0]
						  ],
				'weed2' : [ [0, 0, 0, 0, 0, 0], 
							[0, w2p, w2p, w2p, w2p, 0],
							[0, w2p, w2p, w2p, w2p, 0],
							[0, w2p, w2p, w2p, w2p, 0],
							[0, w2p, w2p, w2p, w2p, 0],
							[0, 0, 0, 0, 0, 0]
						  ],
				'weed3' : [ [0, 0, 0, 0, 0, 0], 
							[0, w3p, w3p, w3p, w3p, 0],
							[0, w3p, w3p, w3p, w3p, 0],
							[0, w3p, w3p, w3p, w3p, 0],
							[0, w3p, w3p, w3p, w3p, 0],
							[0, 0, 0, 0, 0, 0]
						  ],
				'weed4'	: [ [0, 0, 0, 0, 0, 0], 
							[0, w4p, w4p, w4p, w4p, 0],
							[0, w4p, w4p, w4p, w4p, 0],
							[0, w4p, w4p, w4p, w4p, 0],
							[0, w4p, w4p, w4p, w4p, 0],
							[0, 0, 0, 0, 0, 0]
						  ]
			},
			'land3' : { 
				'weed1' : [ [w1p, w1p, w1p, w1p, w1p, w1p], 
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p],
							[w1p, w1p, w1p, w1p, w1p, w1p]
						  ],
				'weed2' : [ [w2p, w2p, w2p, w2p, w2p, w2p], 
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p],
							[w2p, w2p, w2p, w2p, w2p, w2p]
						  ],
				'weed3' : [ [w3p, w3p, w3p, w3p, w3p, w3p], 
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p],
							[w3p, w3p, w3p, w3p, w3p, w3p]
						  ],
				'weed4'	: [ [0, 0, 0, 0, 0, 0], 
							[0, 0, 0, 0, 0, 0],
							[0, 0, 0, 0, 0, 0],
							[0, 0, 0, 0, 0, 0],
							[0, 0, 0, 0, 0, 0],
							[0, 0, 0, 0, 0, 0]
						  ]
			}	
	};
 

	var clicked_boxes = [];
	var weed_class = "";

	// add a slider
	var slider = $( "#slider" ).slider({
		  value:0,
		  animate:true,
		  min: 0,
		  max: Years,
		  step: 1,
		  slide: function( event, ui ) {
			$('.land-block').hide();
			$('.time-'+ui.value).show();
		  }
		});
	function resetModel(){
		restartModel();
		$('#pick_start').prop('selectedIndex',0);
		$('#pick_weed').prop('selectedIndex',0);
		$('#pick_land').prop('selectedIndex',0);
		manual_start = false;
		$('#toggle-random').attr('checked', false);
		clicked_boxes = [];
		
	}
	
	function restartModel(){
		occ=[];
		$('#land_wrapper').html('');
		

	}
	function runModel(){
		nRuns++;
		var start_pick = document.getElementById("pick_start");
 		var start_selected = start_pick.options[start_pick.selectedIndex].value;
		
		//initialize the population
		if(manual_start){
			occ[0] = manualOccupy(start_selected);
		}
		else{
			occ[0] = randomOccupy(start_selected);
		} ;
		//console.info(occ);
		var weed_pick = document.getElementById("pick_weed");
 		var weed_selected = weed_pick.options[weed_pick.selectedIndex].value;
		weed_species = weed_pick.options[weed_pick.selectedIndex].text;
		var land_pick = document.getElementById("pick_land");
 		var land_selected = land_pick.options[land_pick.selectedIndex].value;
		landscape = land_pick.options[land_pick.selectedIndex].text;
		var weednum = weed_pick.selectedIndex;
	
		//occupied_img = "<img src='" + plant_images[weednum] + "' class='plant-img' />";
		weed_class = "weed-"+weednum;
		
		spreadMultiple(land_selected,weed_selected,Years);
		
		//write to log
		//console.info(occ)
		add_to_log(occ[Years])
		$('#bar').html( log_string );
		
		//console.log("weed = " + weed_selected + ", land = " + land_selected);
		$('.land-block').hide();
		$('.time-'+ slider.slider('value') ).show();
		
		//style the land with images in the occupied blocks
		land_squares();
		
		//show a silly picture at random
		//var rand_pic = ['https://idoteach.boisestate.edu/wp-content/uploads/2016/05/cow_moo.jpg',
						//'https://idoteach.boisestate.edu/wp-content/uploads/2016/05/sillycat.jpg'];
		var rand_pic = ['', ''];
		var x_rand = Math.floor(Math.random()*gridN);
		var y_rand = Math.floor(Math.random()*gridN);
		if (Math.random()<1/15 && nRuns > 10 ){
			
			var cell_html = $('.row-'+x_rand+'-col-'+y_rand).html();
			$('.row-'+x_rand+'-col-'+y_rand).html("<img src='"+rand_pic[0]+"' class='plant-img' />");

			setTimeout(function(){$('.row-'+x_rand+'-col-'+y_rand).html(cell_html)} ,1000);
		}
		
	}
	
	// USER INTERFACE
	$('#next-year').click(function(){
		var slider_next = slider.slider('value') < Years ? slider.slider('value') + 1 : 0;
		slider.slider('value', slider_next );
		$('.land-block').hide();
		$('.time-'+ slider.slider('value') ).show();
		return false;
	});
	$('#reset-model').click(function(){
		resetModel();
		restartModel();
		runModel();
		return false;
	});
	$('#pick_weed').change(function() {
		restartModel();
		runModel();
	});
	$('#pick_land').change(function() {
		restartModel();
		runModel();
	});
	$('#pick_start').change(function() {
		restartModel();
		runModel();
	});
		
	restartModel();
	runModel();
	land_squares();	
	
	//User Interface
	var manual_start = false;
	
	$('#toggle-random').click(function(){
		manual_start = this.checked;
	});
	
	$("#land_wrapper").on('click', ".land-box", function(e){
			e.preventDefault();
			var start_pick = document.getElementById("pick_start");
 			var start_selected = start_pick.options[start_pick.selectedIndex].value;
			
            if(manual_start && clicked_boxes.length < start_selected){

                var clicked_x = $(this).attr("data-x");
                var clicked_y = $(this).attr("data-y");
                $(this).css("border-color","#0ff");
                clicked_boxes.push([clicked_x,clicked_y]);
				
  
            }
			if( clicked_boxes.length == start_selected){
				restartModel();
				runModel();
				clicked_boxes =[];
			}
			return false;
	});
	//load a script for copying to the clipboard
	var url = "https://cdn.jsdelivr.net/clipboard.js/1.5.10/clipboard.min.js";
	$.getScript( url, function() {
	 	 new Clipboard('.copy-btn');
	});
	$( '#copy-to-clipboard' ).click(function( event ) {
		event.preventDefault();
	});	
	/* FUNCTIONS */
	// make a list of indices for a matrix
	function matrix_indices (msize){
		var inds=[];
		for (i=1; i<= msize; i++){
			for (j=1; j<= msize; j++){
				inds.push(i+","+j);
			}
		}
		return inds;
	}
	
	//reside land squares to match width of the land
	function land_squares(){
		var land_width = $('#land_wrapper').width();
		var box_width = Math.floor((land_width - 4*gridN)/gridN);
		var plant_width = box_width;
	
		$('.land-box').height(box_width); 
		$('.land-box').width(box_width);
		$('.plant-img').height(plant_width);
		$('.plant-img').width(plant_width);

	}
	//function to flatten an array (general purpose)
	function flatten(arr) {
	  return arr.reduce(function (flat, toFlatten) {
		return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
	  }, []);
	}
	//function to count the number of non-empty elements in a flattened array (for calculating number of occupied cells)
	function countNonEmpty(arr){
		var cnt = 0;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] !== '') {
				++cnt;
			}
		}
		return cnt;
	}
	//function to compute max of a multidimensional array
	function getMaxOfArray(numArray) {
	  return Math.max.apply(null, numArray);
	}

	// create an m x n matrix filled with default value d

	function Matrix(m, n, d){
		var matrix = [];
		for(var i=0; i<m; i++) {
			matrix[i] = [];
			for(var j=0; j<n; j++) {
				matrix[i][j] = d;
			}
		}
		return matrix;
	}

	// function to fill a specify number of cells at random
	function randomOccupy(N){
		var N = typeof N !== 'undefined' ?  N : 1; //set default number of occupied cells to 2 
		var mat = Matrix(gridN, gridN, '');
		var i = countNonEmpty(flatten(mat));
		while (i < N){
			var x_rand = Math.floor(Math.random()*gridN);
			var y_rand = Math.floor(Math.random()*gridN);
			mat[x_rand][y_rand] =0;
			i = countNonEmpty(flatten(mat));
		}
		return mat;
	}
	// function to seed a matrix with a manual list of starting occupied cells
	function manualOccupy(){
		
		var mat = Matrix(gridN, gridN, '');
		for (i=0; i< clicked_boxes.length; i++){
			var pop_x = clicked_boxes[i][0];
			var pop_y = clicked_boxes[i][1];
			mat[pop_x][pop_y]=0;
		}
		return mat;
	}

	// function to simulate one time step of spread
	function spreadOnce(land, weed, occ_matr,yr){
		var occ_matrix = occ_matr[yr];
		var probs = lands[land][weed];
		
		function spreadCell( x, y, p ){		
			if( x <= (gridN-1) && x >=0 && y <= (gridN-1) && y >=0){
				//console.log("x="+ x + ", y=" + y + ", p=" + probs[x][y] + ".");
				if ( occ_matrix[x][y] === '' && Math.random() <= probs[x][y] ){
						spread_to.push([x,y]);
					return ;
				}
			}
			return ;
		}
		var spread_to = []; // keep track of newly occupied cells
		
		for (i=0; i <= (gridN-1); i++){
			for (j=0; j <= (gridN-1); j++){
				if(occ_matrix[i][j] !== ''){
					//console.log("i="+ i + ", j=" + j + " is occupied.");
					spreadCell(i-1,j-1);
					spreadCell(i-1,j);
					spreadCell(i-1,j+1);
					spreadCell(i,j-1);
					spreadCell(i,j+1);
					spreadCell(i+1,j-1);
					spreadCell(i+1,j);
					spreadCell(i+1,j+1);
				}
			}
		}

		if(spread_to.length > 0 ){
			for (i=0; i < spread_to.length; i++){
				occ_matrix[spread_to[i][0]][spread_to[i][1]] = yr;
			}
		}
		
		
	}
	
	function spreadMultiple(land,weed,times){
		//display results
		document.getElementById('land_wrapper').appendChild(displayLand(occ[0], 0));
		
		for (yr=1; yr <= times; yr++){
			
			occ[yr]=occ[yr-1]; //add a year to the occupied array
	
			spreadOnce( land, weed, occ, yr); // simulate 1 time step of spread
			//console.log(yr);
			//console.info(occ[yr]);
			
			document.getElementById('land_wrapper').appendChild(displayLand(occ[yr], yr)); //display results
			
		}
	}
	
	function displayLand(array, timestep) {
		// Create the list element:
		var land = document.createElement('div');
		land.className="land-block time-"+timestep;
		//console.log(Nruns+landscape+weed_species);
		var title = document.createElement('h4');
		var t = document.createTextNode("Simulation #"+nRuns+" after "+timestep+" years. (Land = "+landscape+", Plant = "+weed_species+")");     // Create a text node
		title.appendChild(t);
		land.appendChild(title);
		
		for(var i = 0; i < array.length; i++) {
			// Create the row:
			var row = document.createElement('div');
			row.className="row-"+i;
			// Fill the row
			for(var j = 0; j < array[i].length; j++) {
				//console.log(i+"-"+j);
				//create the cell
				var cell = document.createElement('div');
				
				var isfilled = (array[i][j]!==''? " occupied "+ weed_class :"");
				cell.className = "land-box "+"row-"+i+"-col-"+j+" col-"+j+isfilled;
				cell.setAttribute("data-x",i);
				cell.setAttribute("data-y",j);
				//set the cell contents
				if(array[i][j] !== ''){
					cell.innerHTML = '<p class="timestep timestep-'+ array[i][j] +'">'+array[i][j]+'</span>';
				}
				
				// Add the cell to the row:
				row.appendChild(cell);
			}
			
			// Add the row to the land:
			land.appendChild(row);
		}
	
		// Finally, return the constructed list:
		return land;
	}
	// WRITE TO THE LOG
	function add_to_log(mat){
		log_string += "\n";
		log_string += [nRuns,landscape,weed_species].concat(flatten(mat)).join("\t");
	}
		
		
	
	});
})(jQuery);
