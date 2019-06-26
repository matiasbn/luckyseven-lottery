<template>
  <div >
    <b-jumbotron
      header="Welcome to Lucky7!"
      lead="Bootstrap v4 Components for Vue.js 2"
      class="intro">
      <p>For more information visit website</p>
      <b-button
        variant="primary"
        href="#">More Info</b-button>
      <b-card-group deck>
        <b-card
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural
            lead-in to additional content.
            This content is a little bit longer.
          </b-card-text>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>

        <b-card
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top>
          <b-card-text>
            This card has supporting text below as a natural lead-in to additional content.
          </b-card-text>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>

        <b-card
          title="Title"
          img-src="https://picsum.photos/300/300/?image=41"
          img-alt="Image"
          img-top>
          <b-card-text>
            This is a wider card with supporting text below as a natural
            lead-in to additional content.
            This card has even longer content than the first to show that equal height action.
          </b-card-text>
          <div slot="footer"><small class="text-muted">Last updated 3 mins ago</small></div>
        </b-card>
      </b-card-group>
    </b-jumbotron>
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Monoton|Press+Start+2P&display=swap');
    .intro{
        text-align: center;
        background-image: url('https://wallpapercave.com/wp/wp2337006.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        color: rgba(255, 255, 0, 0.411);
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        border: 0px !important;
        background-origin: padding-box;
    }
    .display-3{
        font-size: 7rem !important;
        font-family: 'Monoton', cursive !important;
    }
    .lead{
        font-size: 1.5rem;
        font-family: 'Press Start 2P', cursive;
    }
</style>
