// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;
	
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardEdit = $('<button class="btn btn-primary">Edytuj</button>');
		var cardDescription = $('<p class="card-description"></p>');
		
		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardEdit.click(function() {
			self.editCard();
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardEdit);
		card.append(cardDescription);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
		var self = this;
	    $.ajax({
	      url: baseUrl + '/card/' + self.id,
	      method: 'DELETE',
	      success: function(){
	      	self.element.remove();
	      }
	    });
	},
	editCard: function() {
		var self = this;
		var newCardName = prompt('Wpisz nową nazwę karty');
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
				name: newCardName,
				bootcamp_kanban_column_id: 5671
			},
			success: function(response) {
				self.name = newCardName;
				self.element.find('p').text(self.name);
			}
		});
	}
}