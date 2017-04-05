_ciffi()
{
    _ciffi_commands="setup dev build newpage newmodule newcomponent e2e jsdoc cssdoc styleguide"

    local cur prev
      COMPREPLY=()
      cur="${COMP_WORDS[COMP_CWORD]}"
      COMPREPLY=( $(compgen -W "${_ciffi_commands}" -- ${cur}) )

      return 0
}

complete -o nospace -F _ciffi ciffi