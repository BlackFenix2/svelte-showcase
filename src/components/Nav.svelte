<script lang="ts">
  import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
  } from 'sveltestrap';

  let isOpen = false;

  const handleUpdate = (event) => {
    isOpen = event.detail.isOpen;
  };
</script>

<style>

</style>

<div />
<Navbar color="light" expand="md">
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
    </Nav>
  </Collapse>
</Navbar>
