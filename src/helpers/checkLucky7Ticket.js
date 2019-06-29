const checkLucky7Ticket = (lucky7GameInfo, payload) => {
  const { ticket } = payload;
  let difference = 0;
  let position = 0;
  if (ticket < lucky7GameInfo[0].number) {
    difference = lucky7GameInfo[0].number - ticket;
  } else if (ticket > lucky7GameInfo[6].number) {
    difference = ticket - lucky7GameInfo[6].number;
    position = 6;
  } else {
    while (ticket > lucky7GameInfo[position].number) {
      position += 1;
    }
    if (ticket === lucky7GameInfo[position].number) {
      difference = 0;
    } else {
      const upperDifference = lucky7GameInfo[position].number - ticket;
      const lowerDifference = ticket - lucky7GameInfo[position - 1].number;
      if (upperDifference > lowerDifference) {
        position -= 1;
        difference = lowerDifference;
      } else {
        difference = upperDifference;
      }
    }
  }
  difference = Math.abs(difference);
  if (payload.grantType === 'recoverPurchased') {
    if (lucky7GameInfo[position].ticketValue === ticket) {
      return { difference, position, lucky7Ticket: true };
    }
    return { difference, position, lucky7Ticket: false };
  }
  if (payload.grantType === 'generatedTicket' || payload.grantType === 'recoverGenerated' || payload.grantType === 'newTicketReceived') {
    if (difference < lucky7GameInfo[position].difference
        || lucky7GameInfo[position].owner === '0x0000000000000000000000000000000000000000') {
      return { difference, position, lucky7Ticket: true };
    }
    return { difference, position, lucky7Ticket: false };
  }
  return { difference, position };
};

export default checkLucky7Ticket;
