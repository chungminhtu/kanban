var board = {
    name: 'Tablica Kanban',
    createColumn: function(column) {
      this.$element.append(column.$element);
      addSortable();
    },
    $element: $('#board .column-container')
};

function addSortable() {
    $('.card').css('cursor', 'move');
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      disabled: false,
      receive: function( event, ui ) {
        var cardId = $(ui.item).find('.card-description').attr('data');
        var columnId = $(this).closest('.column.panel.panel-default').attr('data');
        var cardDescription = $(ui.item).find('.card-description').text();
        
        $.ajax({
          url: baseUrl + '/card/' + cardId,
          method: 'PUT',
          data: {
            id: cardId,
            name: cardDescription,
            bootcamp_kanban_column_id: columnId
          },
          success: function(){
            
          }
        });
      }
    }).disableSelection();
  
    return false;
  };

function disableSortable(){
  $('.card').css('cursor', 'default');
  $('.column-card-list').sortable({
    disabled: true
  }).enableSelection();
  return false;
};

$('.create-column')
  .click(function() {
    var columnName = prompt('Wpisz nazwę kolumny');
    $.ajax({
      url: baseUrl + '/column',
      method: 'POST',
      data: {
        name: columnName
      },
      success: function(response){
        var column = new Column(response.id, columnName);
        board.createColumn(column);
      }
    });
  });