#! /usr/bin/env bash

folder='C:\Users\lucasvtiradentes\wsl\_lucasvtiradentes\other projects\development-utils\boilerplate-projects'
bpm_='ts-node --esm src/index.ts'

# $bpm_                 # DEFAULT EXEC
# $bpm_ -V            # VERSION
# $bpm_ -fb           # FAMOUS BOILERPLATES
# $bpm_ -sb           # STARRED BOILERPLATES
$bpm_ -pb "$folder" # BOILERPLATES FROM PATH
# $bpm_ -f ts         # FILTERING WORDS
# $bpm_ -l            # LISTING CURRENT BOILERPLATES
# $bpm_ -l            # LISTING CURRENT BOILERPLATES WITH DETAILS
# $bpm_ -as           # ADD BOILERPLATE TO STARRED LIST
# $bpm_ -ms           # MANAGE BOILERPLATE FROM STARRED LIST
# $bpm_ -h            # HELP
