import csv
from pathlib import Path

from rest_framework.decorators import api_view
from rest_framework.response import Response

REPO_ROOT = Path(__file__).resolve().parents[2]
SAMPLE_CSV = REPO_ROOT / "data" / "t_segmentation_experiments.csv"

@api_view(["GET"])
def health(request):
    return Response({"status": "ok", "service": "modelbrief-api"})

@api_view(["GET"])
def sample_experiments(request):
    if not SAMPLE_CSV.exists():
        return Response({"detail": "Sample CSV not found."}, status=404)

    rows = []
    with SAMPLE_CSV.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            rows.append({
                "experiment": row["experiment"],
                "dataset": int(row["dataset"]),
                "crop": row["crop"] or None,
                "epochs": int(row["epochs"]),
                "validation_cases": int(row["validation_cases"]),
                "dice": float(row["dice"]),
                "checkpoint": row["checkpoint"],
            })

    best = max(rows, key=lambda item: item["dice"]) if rows else None
    return Response({
        "count": len(rows),
        "metric": "Dice",
        "best_experiment": best,
        "experiments": rows,
    })
