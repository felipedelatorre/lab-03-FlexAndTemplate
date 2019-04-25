'use strict';

function AnimalsWithHorns(animalswithhorns){
  this.image_url = animalswithhorns.image_url;
  this.title = animalswithhorns.title;
  this.description = animalswithhorns.description;
  this.keyword = animalswithhorns.keyword;
  this.horns = animalswithhorns.horns;
}

AnimalsWithHorns.allAnimalsWithHorns = [];
AnimalsWithHorns.allAnimalsWithHornsForPage2 = [];


AnimalsWithHorns.prototype.render = function () {
  let animalswithhornsClone = $('#photo-template').clone();
  let $animalswithhornsClone = $(animalswithhornsClone[0].content);

  // $animalswithhornsClone.find('h2').text(this.title);
  $animalswithhornsClone.find('img').attr('src', this.image_url);
  $animalswithhornsClone.find('img').attr('data-keyword', this.keyword);
  // $animalswithhornsClone.find('p').text(this.description);

  $animalswithhornsClone.appendTo('main');
};



// Gets Data from page-1 json and adds it to allAnimalsWithHorns then loads
AnimalsWithHorns.readJson = () => {
  $.get('./data/page-1.json')
    .then(data => {
      data.forEach(item => {
        AnimalsWithHorns.allAnimalsWithHorns.push(new AnimalsWithHorns(item));
      });
    })
    .then(AnimalsWithHorns.loadAnimalsWithHorns);
};

// Gets Data from page-2 json and adds it to allAnimalsWithHornsForPage2 does not load
AnimalsWithHorns.readJsonforPage2 = () => {
  $.get('./data/page-2.json')
    .then(data => {
      data.forEach(item => {
        AnimalsWithHorns.allAnimalsWithHornsForPage2.push(new AnimalsWithHorns(item));
      });
    });
};

//needs fix placements - adds json file to array
AnimalsWithHorns.readJsonforPage2();



AnimalsWithHorns.loadAnimalsWithHorns = () => {
  AnimalsWithHorns.allAnimalsWithHorns.forEach(animalswithhorns => animalswithhorns.render());
  AnimalsWithHorns.allAnimalsWithHornsForPage2.forEach(animalswithhorns => animalswithhorns.render());
  
};

// its own function
AnimalsWithHorns.loadAnimalsWithHornsForPage2 = () => {
  AnimalsWithHorns.allAnimalsWithHornsForPage2.forEach(animalswithhorns => animalswithhorns.render());
};

AnimalsWithHorns.loadAnimalsWithHornsForPage2();



// Filter
$('select[name="animalswithhorns"]').on('change', function() {
  let $selection = $(this).val();
  $('img').hide();
  $(`img[data-keyword="${$selection}"]`).show();
});



$('.newGallery').on('click', function() {
  $('main').children().remove();
})




$(() => {
  AnimalsWithHorns.readJson();
});

