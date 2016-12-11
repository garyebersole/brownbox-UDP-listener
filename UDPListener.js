#!/usr/bin/env node
/***
 *
 *      TOOL:
 *          UDPListener
 *
 *      USAGE:
 *          node UDPListener.js ipAddress portNumber
 *          node UDPListener.js 10.0.0.30 41234
 *
 *      ENVIRONMENT:
 *          None
 *
 *      UPDATES:
 *          12/7/2016   First code
 *
 *      REFERENCES:
 *          https://nodejs.org/api/dgram.html#dgram_socket_bind_port_address_callback
 *
 */
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

/*
    Use 'commander' to extract arguments form the command line
 */
const program = require('commander');


/*
    Get the host IP address and port number from the command line
 */
program
    .arguments( '<ipArg> <portArg>' )
    .action( function( ipArg, portArg ) {
        // Callbacks
        server.on('error', (err) => {
            console.log(`server error:\n${err.stack}`);
            server.close();
        });
        server.on('message', (msg, rinfo) => {
            console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });
        server.on('listening', () => {
            var address = server.address();
            console.log(`server listening ${address.address}:${address.port}`);
        });

        // Bind to socket and wait for messages
        server.bind(portArg, ipArg);

    })
    .parse(process.argv);


