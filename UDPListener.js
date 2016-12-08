#!/usr/bin/env node
/***
 *
 *      TOOL:
 *          UDPListener
 *
 *      ENV:
 *          None
 *
 *      12/7/2016   First code
 *
 */
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const request = require('superagent');
const program = require('commander');
const fs = require("fs");

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


