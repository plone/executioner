Feature: Login


  As admin user
  I want to log in
  So that I can access guillotina dashboard

  @login
  Scenario: Log in admin page
    Given admin login page
    When I enter user credentials
    And I log in
    Then I see home page

  @logout
  Scenario: Log out
    Given guillotina home page
    When I log out
    Then I am in login page
