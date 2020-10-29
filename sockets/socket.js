const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();


bands.addBand(new Band("Soda Stereo"));
bands.addBand(new Band("The Smiths"));
bands.addBand(new Band("Megadeth"));
bands.addBand(new Band("AC/DC"));
bands.addBand(new Band("DLD"));


// Mensajes de Sockets

io.on('connection', client => {    
    console.log('Cliente Conectado');

    client.emit('active-bands', bands.getBands() );

    client.on('disconnect', ()=> {
        console.log('Cliente Desconectado');
    });

    // client.on("emitir-mensaje", (payload)=>{
    //     client.broadcast.emit('nuevo-mensaje', payload);
    // });
	
	// Permite agregar votos a las bandas
    client.on('vote-band', (payload)=>{
		bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

	// Permite agregar nuevas bandas 
	client.on('add-band', (payload)=>{
		bands.addBand(new Band( payload.name ));
        io.emit('active-bands', bands.getBands());
	});
	
	// Permite eliminar una banda
	client.on('delete-band', (payload)=>{
		bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
	});
	


});