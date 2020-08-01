<script lang="ts">
  import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'sveltestrap';

  let isOpen = false;

  const handleUpdate = (event) => {
    isOpen = event.detail.isOpen;
  };
</script>

<style>

</style>

<div />
<Navbar color="light" light expand="md">
  <NavbarBrand href="/">svelte-showcase</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav navbar>

      <NavItem>
        <NavLink href="about">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="blog">Blog</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">Disabled Link</NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>Games</DropdownToggle>
        <DropdownMenu right>
          <DropdownItem href="games/cameoparison">Cameoparison</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Collapse>
</Navbar>
