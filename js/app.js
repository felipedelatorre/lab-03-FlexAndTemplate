'use strict';

function AnimalsWithHorns(animalswithhorns){
  this.image_url = animalswithhorns.image_url;
  this.title = animalswithhorns.title;
  this.description = animalswithhorns.description;
  this.keyword = animalswithhorns.keyword;
  this.horns = animalswithhorns.horns;
}

AnimalsWithHorns.allAnimalsWithHorns = [];

AnimalsWithHorns.prototype.render = function () {
  let animalswithhornsClone = $('#photo-template').clone();
  let $animalswithhornsClone = $(animalswithhornsClone[0].content);

  // $animalswithhornsClone.find('h2').text(this.title);
  $animalswithhornsClone.find('img').attr('src', this.image_url);
  $animalswithhornsClone.find('img').attr('data-keyword', this.keyword);
  // $animalswithhornsClone.find('p').text(this.description);

  $animalswithhornsClone.appendTo('main');
};

AnimalsWithHorns.readJson = () => {
  $.get('./data/page-1.json')
    .then(data => {
      data.forEach(item => {
        AnimalsWithHorns.allAnimalsWithHorns.push(new AnimalsWithHorns(item));
      });
    })
    .then(AnimalsWithHorns.loadAnimalsWithHorns);
};

AnimalsWithHorns.loadAnimalsWithHorns = () => {
  AnimalsWithHorns.allAnimalsWithHorns.forEach(animalswithhorns => animalswithhorns.render());
};

$('select[name="animalswithhorns"]').on('change', function() {
  let $selection = $(this).val();
  $('img').hide();
  $(`img[data-keyword="${$selection}"]`).show();
});




$(() => AnimalsWithHorns.readJson());
