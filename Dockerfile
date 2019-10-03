FROM node:10-alpine

RUN apk add --no-cache bash
RUN apk add --no-cache zsh
RUN apk add --no-cache git

RUN npm install -g npm
RUN npm install -g ciffi@latest

RUN ciffi -v

USER node

RUN wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | zsh

RUN touch ~/.zshrc
RUN echo "PROMPT='%(?:%{%}🔥 %{\$fg_bold[green]%}➜%{\$reset_color%} :%{%}☠️  %{\$fg_bold[red]%}➜%{\$reset_color%}) %{\$fg_bold[cyan]%}%c%{\$reset_color%} $(git_prompt_info)'" >> ~/.zshrc
RUN echo "" >> ~/.zshrc
RUN echo "alias \"ciffi\"=\"/usr/local/lib/node_modules/.bin/ciffi\"" >> ~/.zshrc
RUN echo "function _ciffi() {" >> ~/.zshrc
RUN echo "  _arguments '1: :((build-old\:\"build old project\" dev-old\:\"dev old project\" setup\:\"setup frontend project\"))'" >> ~/.zshrc
RUN echo "}" >> ~/.zshrc
RUN echo "compdef _ciffi ciffi" >> ~/.zshrc

RUN touch ~/.bashrc
RUN echo "if [ -f /usr/local/lib/node_modules/ciffi/ciffi.bash ]; then" >> ~/.bashrc
RUN echo "  . /usr/local/lib/node_modules/ciffi/ciffi.bash" >> ~/.bashrc
RUN echo "fi" >> ~/.bashrc
RUN npm completion >> ~/.bashrc

USER root
