_ciffi()
{
    _ciffi_commands="build-old dev-old setup"

    local cur prev
      COMPREPLY=()
      cur="${COMP_WORDS[COMP_CWORD]}"
      COMPREPLY=( $(compgen -W "${_ciffi_commands}" -- ${cur}) )

      return 0
}

complete -o nospace -F _ciffi ciffi