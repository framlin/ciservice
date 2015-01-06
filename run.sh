#!/bin/bash
WDIR=$1
forever start -w --watchDirectory $WDIR -l ciservice.log -a $WDIR/server/run.js
