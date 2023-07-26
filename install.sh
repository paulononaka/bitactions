#!/usr/bin/env bash

export NODE=$(which node)

# Go to the BitBar plugins directory
cd "$HOME/Library/Application Support/xbar/plugins/"

# If already installed, check for version updates
if [ -d "bitactions" ]; then
	cd bitactions
	echo "Updating bitactions..."
	git pull origin master --quiet
	echo "Updated successfully."
# If not installed, clone the repository
else
	echo "Downloading bitactions..."
	git clone https://github.com/paulononaka/bitactions --quiet
	echo "Downloaded successfully."
	cd bitactions
fi

# Install node dependencies
echo "Installing npm dependencies..."
npm install
echo "Dependencies installed."

# Create the symlink if it doesn't exist
cd ..
echo "Creating initialization xbar script..."
echo -e '#!/bin/bash \n' > bitactions.1m.sh
echo "cd \"$PWD/bitactions/\"" >> bitactions.1m.sh
echo "$NODE \"$PWD/bitactions/bin/cli.js\"" >> bitactions.1m.sh
chmod +x bitactions.1m.sh

echo "Done."	