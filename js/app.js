'use strict';

AnimalsWithHorns.allAnimalsWithHorns = [];
AnimalsWithHorns.allAnimalsWithHornsForPage2 = [];

function AnimalsWithHorns(animalswithhorns){
  for(let key in animalswithhorns){
    this[key] = animalswithhorns[key];
  }
}

AnimalsWithHorns.prototype.toHtml = function () {
  let source = $('#photo-template').html();
  let template = Handlebars.compile(source);

  return template(this);
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

AnimalsWithHorns.readJsonforPage2();

AnimalsWithHorns.loadAnimalsWithHorns = () => {
  AnimalsWithHorns.allAnimalsWithHorns.forEach(element => {
    $('#herd').append(element.toHtml());
  });
};

AnimalsWithHorns.loadAnimalsWithHornsForPage2 = () => {
  AnimalsWithHorns.allAnimalsWithHornsForPage2.forEach(element => {
    $('#herd').append(element.toHtml());
  });
};

// Filter
$('select[name="animalswithhorns"]').on('change', function() {
  let $selection = $(this).val();
  $('img').hide();
  $(`img[data-keyword="${$selection}"]`).show();
});


$('.newGallery').on('click', function() {
  if($('.newGallery').attr('data-onOff') === 'on') {
    $('main').children().not(':first').remove();
    AnimalsWithHorns.allAnimalsWithHornsForPage2.forEach(element => {
      $('#herd').append(element.toHtml());
    });
    $('button').attr('data-onOff', 'off');
  } else {
    $('main').children().not(':first').remove();
    AnimalsWithHorns.allAnimalsWithHorns.forEach(element => {
      $('#herd').append(element.toHtml());
    });
    $('button').attr('data-onOff', 'on');
  }
})

// $('.sortByhornsOrTitle').on('click', function() {
//   if($('button').attr('data-onOff') === 'on') {
//     $('main').children().not(':first').remove();
//     AnimalsWithHorns.allAnimalsWithHorns.forEach(element => {
//       $('#herd').append(element.toHtml());
//     });
//     $('button').attr('data-onOff', 'off');
//   } else {
//     $('main').children().not(':first').remove();
//     AnimalsWithHorns.allAnimalsWithHorns.forEach(element => {
//       $('#herd').append(element.toHtml());
//     });
//     $('button').attr('data-onOff', 'on');
//   }
// })


$(() => {
  AnimalsWithHorns.readJson();
});

