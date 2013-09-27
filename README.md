Extract Data from your Kostal Piko

![Image](Kostal-UI.png?raw=true)

## Features

Logs your Data and acts as a server with live Data


## Where is it tested?

I own a Kostal Piko 5.5

## Why a script, when there are so many loggers out there already?

Normal data-loggers only provide data every 5 or 15 minutes without voltage or efficiency information.
Since I experience power-drops, when only one solar module is partly shaded I wanted more detailed information
(which in my case clearly shows that on after-noon shade after 5:00 pm it really chooses much to high voltages - resulting in losses of to up to 80%)

## Usage

Copy everything to your node server and do 'npm install' to include all the dependencies.
Add jquery and highcharts libs under public/javascripts/external and start it

    npm kostal-ui.js


The csv-file waits to be imported in your 'logs' directory.
It can also be used in Libreoffice. Just convert TimeExcel colum to "date with time" and use "Insert Diagramm" to view your data.

## Dependencies

Uses [Kostal](www.github.com/zevero/kostal) (also available under 'npm install kostal')
