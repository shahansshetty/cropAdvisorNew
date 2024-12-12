
import { cropDatabase} from "./data/cropdb";


document.getElementById('cropAdvisorForm').addEventListener('submit', function(e) {
e.preventDefault();

const soilType = document.getElementById('soilType').value;
const soilPH = parseFloat(document.getElementById('soilPH').value);
const humidity = parseFloat(document.getElementById('humidity').value);
const rainfall = parseFloat(document.getElementById('rainfall').value);
const temperature = parseFloat(document.getElementById('temperature').value);

const recommendedCrops = cropDatabase.filter(crop => 
    crop.soilTypes.includes(soilType) &&
    soilPH >= crop.minPH && soilPH <= crop.maxPH &&
    humidity >= crop.minHumidity && humidity <= crop.maxHumidity &&
    rainfall >= crop.minRainfall && rainfall <= crop.maxRainfall &&
    temperature >= crop.minTemp && temperature <= crop.maxTemp
);

const cropListElement = document.getElementById('cropList');
const resultsContainer = document.getElementById('resultsContainer');

cropListElement.innerHTML = '';

if (recommendedCrops.length > 0) {
    recommendedCrops.forEach(crop => {
        const li = document.createElement('li');
        
        if (crop.href) {
            const link = document.createElement('a');
            link.href = crop.href;
            link.textContent = crop.name;
            link.target = "_blank"; 
            li.appendChild(link);
        } else {
            li.textContent = crop.name;
        }
        
        cropListElement.appendChild(li);
    });
    resultsContainer.style.display = 'block';
} else {
    const li = document.createElement('li');
    li.textContent = 'No suitable crops found for the given conditions.';
    cropListElement.appendChild(li);
    resultsContainer.style.display = 'block';
}
});