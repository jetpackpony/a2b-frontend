export default function() {
  this.namespace = '/api';

  let routes = [
    {
      id: "1",
      type: "routes",
      attributes: {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phuket, Thailand",
        "transport-type": "bus",
        "organization": "Siam Tour",
        "from-address": "1049 Chuea Phloeng Rd, Khwaeng Chong Nonsi, Khet Yan Nawa, Krung Thep Maha Nakhon 10120, Thailand",
        "to-address": "Ratsada, Mueang Phuket District, Phuket 83000, Thailand",
        "description": "Such bus much travel",
        "duration": "13.25",
        "price": "25",
        "timetable": "7:00 AM",
        "from-coords": "13.714269, 100.553912",
        "to-coords": "7.917681, 98.395802"
      }
    }, {
      id: "2",
      type: "routes",
      attributes: {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phuket, Thailand",
        "transport-type": "train",
        "organization": "Phuket Tour",
        "from-address": "2 Kamphaeng Phet Rd, Lat Yao, Khet Chatuchak, Krung Thep Maha Nakhon 10900, Thailand",
        "to-address": "Mai Khao, Thalang District, Phuket 83110, Thailand",
        "description": "Train to the airport. Yeah.",
        "duration": "7.00",
        "price": "66",
        "timetable": "12:00 AM",
        "from-coords": "13.813034, 100.548614",
        "to-coords": "8.110904, 98.307548"
      }
    }, {
      id: "3",
      type: "routes",
      attributes: {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phuket, Thailand",
        "transport-type": "ferry",
        "organization": "Swimming on land with a very long name Tour",
        "from-address": "ช่องจำหน่ายตั๋วพรนิภาทัวร์ สถานีขนส่งเอกมัย Khwaeng Phra Khanong, Khet Khlong Toei, Krung Thep Maha Nakhon 10110, Thailand",
        "to-address": "Luangphow Soi 1, Tambon Talat Yai, Amphoe Mueang Phuket, Chang Wat Phuket 83000, Thailand",
        "description": "Verry ferry",
        "duration": "28.00",
        "price": "6",
        "timetable": "3:00 PM",
        "from-coords": "13.719909, 100.583871",
        "to-coords": "7.884160, 98.395704"
      }
    }
  ];

  this.get('/routes', function(schema, request) {
    let params = request.queryParams;
    if (params['filter[from]'] !== undefined &&
        params['filter[to]'] !== undefined) {
      return {
        data: routes.filter(function(x) {
          return x.attributes['from-city'] === params['filter[from]'] &&
            x.attributes['to-city'] === params['filter[to]'];
        })
      };
    } else {
      return { data: [] };
    }
  });

  this.get('/routes/:id', function(schema, request) {
    return { data: routes.find((x) => x.id === request.params.id) };
  });
}
