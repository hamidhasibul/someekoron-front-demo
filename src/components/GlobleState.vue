<!-- inside provider component -->
<script setup>
const location = ref("North Pole");

function updateLocation() {
  location.value = "South Pole";
}

provide("location", {
  location,
  updateLocation,
});
</script>
