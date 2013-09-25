Extract Data from your Kostal Piko

## Features

Logs your Data and acts as a server with live Data


## Where ist tested?

I own a Kostal Piko 5.5

## Why a script, when there are so many loggers out there already?

Normal data-loggers only provide data every 5 or 15 minutes without voltage information.
Since I experience power-drops, when only one solar module is partly shaded I needed more detailed information.

## Usage

Copy everything to your node server and do 'npm install' to include all the dependencies. Add jquery and highcharts libs under public/javascripts/external 

Off you go! Stop it with Ctrl-C :)

The csv-file waits to be imported in your 'logs' directory.
Be sure to format the TimeExcel colum to "date with time" and use "Insert Diagramm" to view your data.

## Dependencies

Uses [Kostal](www.github.com/zevero/kostal) (also available under 'npm install kostal')
