pragma solidity ^0.5.0

library Lucky7Structs {

  /** @dev UserParametersValue is a struct where the values of the user ticket is stored temporarily.
   * While the user is just generating (not buying) tickets, the values of this struct for each user are going to change.
   * Once the user buys a ticket, all the parameters of this struct are used to generate a ticket and store it in the tickets array.
   * where they will be stored permanently.
   * @param mu is a parameter of the pseudo-random number generator (PRNG).
   * @param i is a parameter of the pseudo-random number generator (PRNG).
   * @param ticketValue is the value of the last buyed ticket of the user.
   * @param muReady is a boolean value used for the oraclize's callback function to verify if the mu parameter for the current ticket was already setted.
   * @param iReady is a boolean value used for the oraclize's callback function to verify if the i parameter for the current ticket was already setted.
   * @param userPaidTicket is a boolean value to verify if the user which is calling for the oraclize query actually paid for the ticket or is just generating
   * parameters to choose a ticket.
   */
  struct UserParametersValue {
    string mu;
    string i;
    uint ticketValue;
    bool muReady;
    bool iReady;
    bool userPaidTicket;
  }

  /** @pdev Ticket is a struct to store information of the tickets. It information is stored permanently through the tickets array.
   * @param mu is a parameter of the pseudo-random number generator (PRNG).
   * @param i is a parameter of the pseudo-random number generator (PRNG).
   * @param ticketValue is the value of ticket.
   * @param owner is the owner of the ticket.
   * @param gameID is the number of the draw for this ticket, i.e. the game where this ticket was emitted.
   */
  struct Ticket {
    string mu;
    string i;
    uint ticketValue;
    address owner;
    uint gameID;
  }

  /** @dev Lucky7Number is a struct to store the information of the Lucky7Numbers. Is used for the lucky7Numbers array
   * and it information is erased when a new game is setted, i.e. it information is replaced with the Lucky7Numbers information
   * of the new game.
   * @param mu is a parameter of the pseudo-random number generator (PRNG).
   * @param i is a parameter of the pseudo-random number generator (PRNG).
   * @param ticketValue is the value of the Lucky7Number.
   * @param gameID is the number of the draw for this Lucky7Number, i.e. the game where this Lucky7Number was emitted.
   */
  struct Lucky7Number {
    string mu;
    string i;
    uint ticketValue;
    uint gameID;
  }

  /** @dev Lucky7Ticket is a struct to store the information of the Lucky7Tickets. Is used once a new game is setted, and it store the information of the final
   * Lucky7Tickets permanently.
   * @param difference is the difference (in absolute value) of the ticket with the Lucky7Number.
   * @param owner is the owner of the Lucky7Ticket.
   * @param ticketID is the ticket ID of the ticket which was selected as Lucky7Ticket. Is helpful to look up in the ticketID mapping to verify
   * past games and results.
   * @param ticketValue is the value of the ticket associated to this Lucky7Ticket.
   * @param lucky7Number is the value of the Lucky7Number associated to this Lucky7Ticket.
   * @param lucky7NumberID is the ID of the Lucky7Number associated to this Lucky7Ticket, i.e. if 0 is the first Lucky7Number of the draw.
   * @param gameID is the number of the draw for this Lucky7Ticket, i.e. the game where this Lucky7Ticket was emitted.
   */
  struct Lucky7Ticket {
    uint difference;
    address owner;
    uint ticketID;
    uint ticketValue;
    uint lucky7Number;
    uint lucky7NumberID;
    uint gameID;
    uint prize;
  }

  struct PrizeInfo {
    uint amount;
    uint gameID;
  }
}
