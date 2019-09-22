#!/bin/bash

FUNCTION_FLAG=$2

COMPONENT_NAME=$1
PWD=$(pwd)

COMPONENTS_DIR="$PWD/src/scripts/components/"

if ! [ -d "$COMPONENTS_DIR" ]; then
  # Control will enter here if $DIRECTORY DOES NOT exist.
  mkdir "$COMPONENTS_DIR"
fi

COMPONENT_DIRECTORY="$COMPONENTS_DIR$COMPONENT_NAME"
COMPONENT_FILE_JSX="$COMPONENT_DIRECTORY/$COMPONENT_NAME.jsx"
COMPONENT_FILE_STYLE="$COMPONENT_DIRECTORY/style.jsx"
#COMPONENT_FILE_STORY="$COMPONENT_DIRECTORY/$COMPONENT_NAME.story.jsx"
COMPONENTS_FILE_INDEX="$COMPONENTS_DIR/index.js"

if [ -d "$COMPONENT_DIRECTORY" ]; then
  # Control will enter here if $DIRECTORY exists.
  echo "ERROR: Component $COMPONENT_NAME already exists"
  exit
fi

echo "Creating directory $COMPONENT_DIRECTORY..."
mkdir $COMPONENT_DIRECTORY
echo "Done."

#component
echo "Creating file $COMPONENT_FILE_JSX..."
touch $COMPONENT_FILE_JSX
echo "Done"

if [ -z $FUNCTION_FLAG ]; then
    echo "import React from 'react'"     >> $COMPONENT_FILE_JSX
    echo "import {Styled$COMPONENT_NAME} from './style.jsx'"     >> $COMPONENT_FILE_JSX
    echo "const $COMPONENT_NAME = () => {"    >> $COMPONENT_FILE_JSX
    echo ""                                     >> $COMPONENT_FILE_JSX
    echo "    return ("                      >> $COMPONENT_FILE_JSX
    echo "      <Styled$COMPONENT_NAME>" >> $COMPONENT_FILE_JSX
    echo "        $COMPONENT_NAME" >> $COMPONENT_FILE_JSX
    echo "      </Styled$COMPONENT_NAME>" >> $COMPONENT_FILE_JSX
    echo "    )" >> $COMPONENT_FILE_JSX
    echo "}"                                    >> $COMPONENT_FILE_JSX
else
    echo "import React, { Component } from 'react'"     >> $COMPONENT_FILE_JSX
    echo "import {Styled$COMPONENT_NAME} from './style.jsx'"     >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "class $COMPONENT_NAME extends Component {"    >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "    constructor(props){"                      >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "        super(props)"                         >> $COMPONENT_FILE_JSX
    echo "        this.state = {}"                   >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "    }"                                        >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "    render() {"                               >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "      return ("                      >> $COMPONENT_FILE_JSX
    echo "        <Styled$COMPONENT_NAME>" >> $COMPONENT_FILE_JSX
    echo "          $COMPONENT_NAME" >> $COMPONENT_FILE_JSX
    echo "        </Styled$COMPONENT_NAME>" >> $COMPONENT_FILE_JSX
    echo "      )" >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "    }"                                        >> $COMPONENT_FILE_JSX
    echo ""                                             >> $COMPONENT_FILE_JSX
    echo "}"  >> $COMPONENT_FILE_JSX
fi
echo ""                                     >> $COMPONENT_FILE_JSX
echo "export default $COMPONENT_NAME"       >> $COMPONENT_FILE_JSX

#style
echo "Creating file $COMPONENT_FILE_STYLE ..."
touch $COMPONENT_FILE_STYLE
echo "Done"

echo "import styled, { css } from 'styled-components'"                >> $COMPONENT_FILE_STYLE
echo "import { BP, Colors, Fonts, Weights, Rem, Ratio, Sizes } from 'Theme'"                >> $COMPONENT_FILE_STYLE
echo ""                                                             >> $COMPONENT_FILE_STYLE
echo "export const Styled$COMPONENT_NAME = styled.div\`\`"  >> $COMPONENT_FILE_STYLE

#story
#echo "Creating file $COMPONENT_FILE_STORY ..."
#touch $COMPONENT_FILE_STORY
#echo "Done"
#
#echo "import React from 'react'"                                    >> $COMPONENT_FILE_STORY
#echo "import { storiesOf } from '@storybook/react'"                >> $COMPONENT_FILE_STORY
#echo ""                                                             >> $COMPONENT_FILE_STORY
#echo "import $COMPONENT_NAME from './$COMPONENT_NAME.jsx'"                >> $COMPONENT_FILE_STORY
#echo ""                                                             >> $COMPONENT_FILE_STORY
#echo "storiesOf('$COMPONENT_NAME', module)"  >> $COMPONENT_FILE_STORY
#echo "  .add('Default', () => (<$COMPONENT_NAME />))"                                  >> $COMPONENT_FILE_STORY

#components index.js
echo "export { default as $COMPONENT_NAME } from './$COMPONENT_NAME/$COMPONENT_NAME.jsx'" >> $COMPONENTS_FILE_INDEX
