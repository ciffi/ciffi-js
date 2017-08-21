_ciffi()
{
    _ciffi_commands="assets build build-old cssdoc dev dev-old e2e jsdoc newcomponent newmodule newpage setup styleguide styles"

    local cur prev
      COMPREPLY=()
      cur="${COMP_WORDS[COMP_CWORD]}"
      COMPREPLY=( $(compgen -W "${_ciffi_commands}" -- ${cur}) )

      return 0
}

complete -o nospace -F _ciffi ciffi