Feature: Form

  Scenario Outline: I need an email validator
    Given Email to check is <address>
    Then My email should be <isvalid>

    Examples:
      | address           | isvalid |
      | alessio@ciffi.it  | true    |
      | alessio@ciffi     | false   |
      | alessio@ciffi.t   | false   |
      | alessiociffi.it   | false   |
      | alessiociffiit    | false   |
      | NULL              | false   |
