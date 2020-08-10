import math
import os
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns


def print_distribution(dataf, column, axis):

    if dataf[column].dtype == "float64" or dataf[column].dtype == "int32":
        bins = int(len(dataf) * 0.01)
        axis.hist(dataf[column], color="blue", edgecolor="black", bins=bins)

        # Add labels
        axis.set_title(column)
        # axis.set(xlabel='x-label', ylabel='y-label')
        # axis.label_outer()

    else:
        vc = dataf[column].value_counts()
        counts = vc.values.tolist()
        labels = vc.keys().tolist()
        x = np.arange(len(labels))
        axis.bar(x, counts, label=column)

    axis.set_title(column)


class MyPlotGrid:
    def __init__(self, ncols, total_plots, figsize=(15, 10), padding=3.0):
        self.ncols = ncols
        self.total_plots = total_plots
        self.nrows = math.ceil(total_plots / ncols)
        print("num rows", self.nrows, "num cols", self.ncols, " total", total_plots)
        self.fig, self.axs = plt.subplots(self.nrows, self.ncols, figsize=figsize)
        self.fig.tight_layout(pad=padding)

    def __iter__(self):
        self.current_col = 0
        self.current_row = 0
        return self

    def __next__(self):
        if self.current_row < self.nrows:
            x = self.axs[self.current_row, self.current_col]
            self.current_col = self.current_col + 1
            if self.current_col == self.ncols:
                self.current_col = 0
                self.current_row += 1
            return x
        else:
            raise StopIteration


def my_distributions_view(df, selected_columns, ncols=2, figsize=(15, 25)):
    plot_grid = MyPlotGrid(
        ncols=ncols, total_plots=len(selected_columns), figsize=figsize
    )
    plot_grid_iter = iter(plot_grid)
    for column in selected_columns:
        plot_axis = next(plot_grid_iter)
        print_distribution(df, column, plot_axis)

