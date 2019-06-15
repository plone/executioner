Feature: Container management

   As admin user
   I want to manage containers
   So that I can add and remove content



  Scenario: Add a new container
    Given admin user in db page
    When I add a new container
    Then container id is shown
    And container name is shown
    And container uid is shown

  Scenario: Edit container title
   Given an existing container
   And admin user in db page
   When I select the container
   And I open editor mode
   And I update the title
   Then updated toast is displayed
   And the new title is displayed in the details

   #TBD: test implementation blocked by the confirmation pop-up
   #Scenario: delete container
   # when I delete the container
   # Then container is deleted

