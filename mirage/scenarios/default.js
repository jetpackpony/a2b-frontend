let route1 = {
  fromCity: "Bangkok, Thailand",
  fromAddress: "1049 Chuea Phloeng Rd, Khwaeng Chong Nonsi, Khet Yan Nawa, Krung Thep Maha Nakhon 10120, Thailand",
  fromCoords: "13.714269, 100.553912",
  toCity: "Phuket, Thailand",
  toAddress: "Ratsada, Mueang Phuket District, Phuket 83000, Thailand",
  toCoords: "7.917681, 98.395802"
};

let route2 = {
  fromCity: "Bangkok, Thailand",
  fromAddress: "2 Kamphaeng Phet Rd, Lat Yao, Khet Chatuchak, Krung Thep Maha Nakhon 10900, Thailand",
  fromCoords: "13.813034, 100.548614",
  toCity: "Surat Thani, Thailand",
  toAddress: "Talat, Mueang Surat Thani District, Surat Thani 84000, Thailand",
  toCoords: "9.143770, 99.330648"
};

let route3 = {
  fromCity: "Surat Thani, Thailand",
  fromAddress: "348/17 Talad Mai Road Soi 19, Tumbol Talad, Talat, Mueang Surat Thani District, Surat Thani 84000, Thailand",
  fromCoords: "9.139888, 99.323887",
  toCity: "Phuket, Thailand",
  toAddress: "Luangphow Soi 1, Tambon Talat Yai, Amphoe Mueang Phuket, Chang Wat Phuket 83000, Thailand",
  toCoords: "7.884160, 98.395704"
};

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  route1 = server.create('route', route1);
  route2 = server.create('route', route2);
  route3 = server.create('route', route3);

  let itinerary1 = server.create('itinerary', {
    fromCity: "Bangkok, Thailand",
    toCity: "Phuket, Thailand"
  });
  let itinerary2 = server.create('itinerary', {
    fromCity: "Bangkok, Thailand",
    toCity: "Phuket, Thailand"
  });

  server.create('itinerary-route', { itinerary: itinerary1, route: route1 });
  server.create('itinerary-route', { itinerary: itinerary2, route: route2 });
  server.create('itinerary-route', { itinerary: itinerary2, route: route3 });
}
