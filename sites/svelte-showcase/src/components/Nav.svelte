<script lang="ts">
  import {
    Collapse,
    Nav,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'sveltestrap';

  let isOpen = true;

  const handleUpdate = (event) => {
    isOpen = event.detail.isOpen;
  };

</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">svelte-showcase</NavbarBrand>
  <NavbarToggler
    on:click={() => (isOpen = !isOpen)}
    aria-label="Navbar Toggler" />

  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav navbar>
      <NavItem>
        <NavLink href="/about">About</NavLink>
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Games</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="/games/cameoparison">Cameoparison</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>
