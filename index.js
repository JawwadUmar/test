// script.js
let previousPosition;
let previousTimestamp;

function calculateSpeed(newPosition, newTimestamp) {
    if (!previousPosition || !previousTimestamp) {
        previousPosition = newPosition;
        previousTimestamp = newTimestamp;
        return 0;
    }

    const distance = haversineDistance(previousPosition, newPosition); // Calculate distance
    const timeDiff = (newTimestamp - previousTimestamp) / 1000; // Calculate time difference in seconds
    const speed = (distance / timeDiff) * 3.6; // Convert to km/h

    previousPosition = newPosition;
    previousTimestamp = newTimestamp;

    return speed.toFixed(2);
}

function haversineDistance(coord1, coord2) {
    const R = 6371; // Earth's radius in kilometers (you can use 3959 for miles)
    const lat1 = coord1.latitude;
    const lon1 = coord1.longitude;
    const lat2 = coord2.latitude;
    const lon2 = coord2.longitude;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}


function updateSpeedometer() {
    navigator.geolocation.watchPosition((position) => {
        const speed = calculateSpeed(position.coords, new Date());
        document.getElementById('speed-value').textContent = speed;
    });
}

updateSpeedometer();
