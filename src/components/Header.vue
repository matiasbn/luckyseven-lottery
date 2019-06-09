<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="success"
      fixed="top">
      <b-navbar-brand to="/">Lucky7</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"/>

      <b-collapse
        id="nav-collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item to="/rules">Rules</b-nav-item>
          <b-nav-item to="/prng">How Numbers Generates</b-nav-item>
          <b-nav-item to="/game_info">Current Game</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav
          class="ml-auto"
          right>
          <b-nav-item to="/past_games">Past Games</b-nav-item>
          <b-nav-item to="/past_tickets">Past Tickets</b-nav-item>
          <b-nav-item to="/">Sign Out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
