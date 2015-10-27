new Vue({
// We want to target the div with an id of 'events'
  el: '#events',
  // Here we can register any values or collections that hold data
  // for the application
  data: {
    event: { name: '', description: '', date: '' },
    events: []
  },

  // Anything within the ready function will run when the application loads
  ready: function() {
    this.fetchEvents();
  },

  // Methods we want to use in our application are registered here
  methods: {
    // Adds an event to the existing events array
    addEvent: function() {
      if(this.event.name) {
        this.$http.post('http://localhost:8000/api/events', this.event).success(function(response) {
          this.events.push(this.event);
          console.log("Event added!");
        }).error(function(error) {
          console.log(error);
        });
        //this.events.push(this.event);
        this.event = { name: '', description: '', date: '' };
      }
    },
    fetchEvents: function() {
       var events = [
        {
          id: 1,
          name: 'First Event',
          description: 'Read Hacker News',
          date: '2015-10-25'
        },
        {
          id: 2,
          name: 'Watch Movie',
          description: 'Lets Go to watch The Martian.',
          date: '2015-10-26'
        },
        {
          id: 3,
          name: 'Party',
          description: 'Birthday Party.',
          date: '2016-10-27'
        }
      ];
      // $set is a convenience method provided by Vue that is similar to pushing
      // data onto an array
      this.$set('events', events);
    },
    deleteEvent: function(index) {
      if(confirm("Are you sure you want to delete this event?")) {
        // $remove is a Vue convenience method similar to splice
        // this.$http.delete('api/events/' + event.id).success(function(response) {
        //   this.events.$remove(index);
        // }).error(function(error) {
        //   console.log(error);
        // });
        this.events.splice(index,1);        
      }
    }

  }
});