Feature: My site

  Scenario: I need to see the body content
    Given I have "body" tag
    Then "body" must have className "app-is-ready"
    And "body" must have css "background-color" "rgba(0, 0, 0, 0)"