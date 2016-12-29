_ciffi()
{
    _ciffi_commands="setup serve dev build build-prod dev-unit unit newpage newmodule newcomponent e2e jsdoc cssdoc styleguide update"

    local cur prev
      COMPREPLY=()
      cur="${COMP_WORDS[COMP_CWORD]}"
      COMPREPLY=( $(compgen -W "${_ciffi_commands}" -- ${cur}) )

      return 0
}

complete -o nospace -F _ciffi ciffi